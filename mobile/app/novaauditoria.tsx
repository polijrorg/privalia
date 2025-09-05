import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, Alert } from 'react-native';

import { Button } from '~/components/Button';
import Card from '~/components/Card';
import { Input } from '~/components/Input';
import { Chip } from '~/components/Chip';
import { cores } from '~/Utils/cores';
import ResponsiveLayout from '~/components/ResponsiveLayout';
import { Header } from '~/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalStorageModels from '~/types/LocalStorageModels';
import { Typography } from '~/Utils/Tipografia';

type Dica = {
  numero: string;
  titulo: string;
  texto: string;
};

const arrDicas: Dica[] = [
  {
    numero: '1',
    titulo: 'Escaneamento',
    texto: 'Escaneie o código EAN de cada produto usando a câmera do tablet',
  },
  {
    numero: '2',
    titulo: 'Validação Visual',
    texto: 'Compare o produto físico com a imagem de referência do sistema',
  },
  { numero: '3', titulo: 'Registro', texto: 'Aprove ou registre divergências com foto e motivo' },
  {
    numero: '4',
    titulo: 'Relatório',
    texto: 'Gere automaticamente o relatório final com índice de desvio',
  },
];

export default function NovaAuditoria() {
  const router = useRouter();

  const [nomeCampanha, setnomeCampanha] = useState('');
  const [pedido, setPedido] = useState('');
  const [po, setPO] = useState('');
  const [IdZepre, setIdZepre] = useState('');
  const [totalPecas, setTotalPecas] = useState('');
  const [totalPecasPercentual, settotalPecasPercentual] = useState('100');
  const [labelPedido, setLabelPedido] = useState('Pedido (Opcional)');
  const [labelPo, setLabelPo] = useState('PO (Opcional)');
  const [labelIdZepre, setLabelIdZepre] = useState('ID/ZPRE (Opcional)');
  const [processoAuditoria, setProcessoAuditoria] = useState('');
  const [modeloNegocioSelecionado, setmodeloNegocioSelecionado] = useState('');

  const optModeloNegocio = [
    { label: 'Selecione o modelo de negócio', value: '0' },
    { label: 'ODP', value: '1' },
    { label: 'Flash', value: '2' },
    { label: 'UDC', value: '3' },
    { label: 'Líquida', value: '4' },
    { label: 'Reversa', value: '5' },
    { label: 'ABC', value: '6' },
  ];
  const optProcessoAuditado = [
    { label: 'Selecione o processo auditado', value: '0' },
    { label: 'Recebimento', value: 'recebimento' },
    { label: 'Blocado', value: 'blocado' },
    { label: 'Check-out', value: 'checkout' },
  ];

  function handleTotalPecasChange(text: string) {
    setTotalPecas(text);

    let textAux = Number(text);

    // calcular o totalPecasPercentual
    if (textAux < 10) {
      text = '100';
    }
    if (textAux < 50) {
      text = '10';
    } else if (textAux < 80) {
      text = '8';
    }
    if (textAux > 50) {
      text = '6';
    }

    settotalPecasPercentual(text); // ou algum cálculo/transformação com o texto
  }

  function handleProcessoAuditadoChange(text: string) {
    if (text === 'checkout') {
      setLabelPedido('Pedido');
      setLabelPo('');
      setLabelIdZepre('');
    } else if (text === 'recebimento') {
      setLabelPedido('');
      setLabelPo('PO');
      setLabelIdZepre('ID/ZPRE');
    } else {
      setLabelPedido('Pedido (Opcional)');
      setLabelPo('PO (Opcional)');
      setLabelIdZepre('ID/ZPRE (Opcional)');
    }

    setProcessoAuditoria(text);
  }

  const handleModeloChange = (text: string) => {
    setmodeloNegocioSelecionado(text);
  };

  const handleVoltar = () => {
    router.push('/');
  };

  const handleIniciarAuditoria = async () => {
    // Validação dos campos
    const mensagemErro = ValidaCampos();

    // Se houve erro, apresenta mensagem de erro
    if (mensagemErro) {
      Alert.alert('Atenção!', mensagemErro);
      return;
    }

    //TODO: passar o modelo de negócio correto
    // Informações a serem salvas
    const info: LocalStorageModels.Campanha = {
      nome: nomeCampanha,
      modeloNegocio: modeloNegocioSelecionado,
      processoAuditado: processoAuditoria,
      pedido: pedido,
      po: po,
      idZepre: IdZepre,
      totalPecas: totalPecas,
      // TODO: passar o valor da amostragem
      amostragem: Number(totalPecas),
      aprovados: 0,
      divergencias: 0,
      itensAuditados: 0,
    };

    await AsyncStorage.setItem('campanha', JSON.stringify(info));

    router.push('/leituraEAN');
  };

  function ValidaCampos() {
    if (nomeCampanha.trim().length <= 2) {
      return 'Insira um nome de campanha válido';
    } else if (modeloNegocioSelecionado.trim() === '' || modeloNegocioSelecionado === '0') {
      return 'Selecione o modelo de negócio';
    } else if (processoAuditoria.trim() === '' || processoAuditoria === '0') {
      return 'Selecione o processo de auditoria';
    } else if (processoAuditoria === 'recebimento' && IdZepre === '' && po === '') {
      return 'Preencha o número do PO e o ID/ZPRE';
    } else if (processoAuditoria === 'checkout' && pedido === '') {
      return 'Preencha o número do pedido';
    } else if (Number(totalPecas) <= 0) {
      return 'Insira o número total de peças';
    }

    return '';
  }

  return (
    <ResponsiveLayout
      header={
        <Header
          onHandleVoltar={handleVoltar}
          titulo="Nova auditoria"
          subTitulo="Configure os parâmetros da auditoria"
        />
      }
      left={
        <>
          <Card className="h-auto w-full lg:h-full lg:w-1/3">
            <Text className={Typography.Titulo1}>Dados da Auditoria</Text>
            <Text className={Typography.Subtitulo2 + ' mb-5'}>
              Preencha as informações do lote a ser auditado
            </Text>
            <Input
              label="Nome da campanha"
              placeholder="Ex: PRIV-2024-001"
              value={nomeCampanha}
              onChangeText={setnomeCampanha}
            />
            <Input
              label="Modelo de negócio"
              type="select"
              value=""
              options={optModeloNegocio}
              onSelectChange={handleModeloChange}
            />
            <Input
              label="Processo Auditado"
              type="select"
              options={optProcessoAuditado}
              onSelectChange={handleProcessoAuditadoChange}
              value=""
            />

            <View className="w-full flex-row flex-wrap items-center gap-5">
              {labelPedido !== '' && (
                <View className="w-1/3">
                  <Input
                    label={labelPedido}
                    placeholder="Ex: PED-2024-001"
                    value={pedido}
                    onChangeText={setPedido}
                  />
                </View>
              )}
              {labelPo !== '' && (
                <View className="w-1/3">
                  <Input
                    label={labelPo}
                    placeholder="Ex: PO-2024-001"
                    value={po}
                    onChangeText={setPO}
                  />
                </View>
              )}
              {labelIdZepre !== '' && (
                <View className="w-1/3">
                  <Input
                    label={labelIdZepre}
                    placeholder="Ex: ZPRE-2024-001"
                    value={IdZepre}
                    onChangeText={setIdZepre}
                  />
                </View>
              )}
            </View>
            <Input
              label="Total de Peças do Lote"
              placeholder="Ex: 1000"
              value={totalPecas}
              onChangeText={handleTotalPecasChange}
              keyboardType="numeric"
            />
            <Text className={Typography.Subtitulo3}>Tamanho da amostra (Calculado)</Text>
            <Card className="my-3">
              <Text className="font-bold text-primary">{`${totalPecas === '' ? '0' : totalPecas} peças (${totalPecasPercentual}%)`}</Text>
            </Card>
            <Text className={Typography.Subtitulo3}>
              Calculado automaticamente como 6% do total de peças
            </Text>
            <View className="mb-5 flex-1"></View>
            <Button title="Iniciar auditoria" onPress={handleIniciarAuditoria}></Button>
          </Card>
        </>
      }
      right={
        <>
          <Card className="h-auto w-full lg:h-full lg:w-1/3">
            <Text className="mb-5 text-2xl font-bold text-white">Processo de Auditoria</Text>
            <View className="mb-5 flex gap-5">
              {arrDicas.map((item, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <Chip text={item.numero} color={cores.primary} />
                  <View className="w-full">
                    <Text className={Typography.Titulo3}>{item.titulo}</Text>
                    <Text className={Typography.Subtitulo3 + ' break-words'}>{item.texto}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Card className="mb-2 gap-2 bg-primaryDark">
              <Text className={Typography.Titulo1}>Dica</Text>
              <Text className={Typography.Titulo3}>
                A amostragem é calculada automaticamente seguindo as normas de auditoria logística,
                garantindo representatividade estatística do lote.
              </Text>
            </Card>
          </Card>
        </>
      }
    />
  );
}
