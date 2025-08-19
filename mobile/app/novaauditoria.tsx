import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, ScrollView, Alert } from 'react-native';

import { Button } from '~/components/Button';
import Card from '~/components/Card';
import { Input, Option } from '~/components/Input';
import { Chip } from '~/components/Chip';
import { number } from 'better-auth';

export default function NovaAuditoria() {
  const router = useRouter();

  const [campanha, setCampanha] = useState('');
  const [pedido, setPedido] = useState('');
  const [po, setPO] = useState('');
  const [IdZepre, setIdZepre] = useState('');
  const [totalPecas, setTotalPecas] = useState('');
  const [totalPecasPercentual, settotalPecasPercentual] = useState('100');
  const [labelPedido, setLabelPedido] = useState('Pedido (Opcional)');
  const [labelPo, setLabelPo] = useState('PO (Opcional)');
  const [labelIdZepre, setLabelIdZepre] = useState('ID/ZPRE (Opcional)');
  const [processoAuditoria, setProcessoAuditoria] = useState('');

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
    // Define o label para quando será obrigatório ou não o pedido
    text === 'checkout' ? setLabelPedido('Pedido') : setLabelPedido('Pedido (Opcional)');
    text === 'recebimento' ? setLabelPo('PO') : setLabelPo('PO (Opcional)');
    text === 'recebimento' ? setLabelIdZepre('ID/ZPRE') : setLabelIdZepre('ID/ZPRE (Opcional)');

    setProcessoAuditoria(text);
  }

  const handleModeloChange = () => {};

  const handleVoltar = () => {
    router.push('/');
  };

  const handleIniciarAuditoria = () => {
    // Validação dos campos
    var mensagemErro = ValidaCampos();

    // Se houve erro, apresenta mensagem de erro
    if (mensagemErro) {
      Alert.alert('Atenção!', mensagemErro);
      return;
    }

    router.push({
      pathname: '/leituraEAN',
      params: {
        nomecampanha: campanha,
        numeropecas: totalPecas,
        processoAuditoria: processoAuditoria,
      },
    });
  };

  function ValidaCampos() {
    if (processoAuditoria.trim() === '') {
      return 'Selecione o processo de auditoria';
    } else if (processoAuditoria === 'recebimento' && IdZepre === '' && po === '') {
      return 'Preencha o número do PO e o ID/ZPRE';
    } else if (processoAuditoria === 'checkout' && pedido === '') {
      return 'Preencha o número do pedido';
    }

    return '';
  }

  return (
    <ScrollView
      className="flex-1 flex-col bg-backgroundPattern p-6"
      contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mb-5 flex-row gap-5">
        <Button title="Voltar" onPress={handleVoltar}></Button>
        <View>
          <Text className="text-2xl font-bold text-white">Nova auditoria</Text>
          <Text className="text-1xl font-bold text-secondary">
            Configure os parâmetros da auditoria
          </Text>
        </View>
      </View>

      <View className="flex-1 flex-row flex-wrap justify-center gap-5">
        {/*Primeira coluna*/}
        <Card className="h-auto w-full lg:h-full lg:w-1/3">
          <Text className="text-2xl font-bold text-white">Dados da Auditoria</Text>
          <Text className="text-1xl mb-5 font-bold text-secondary">
            Preencha as informações do lote a ser auditado
          </Text>
          <Input
            label="Nome da campanha"
            placeholder="Ex: PRIV-2024-001"
            value={campanha}
            onChangeText={setCampanha}
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

          <View className="w-full flex-row gap-5">
            <Input
              label={labelPedido}
              placeholder="Ex: PED-2024-001"
              value={pedido}
              onChangeText={setPedido}
            />
            <Input label={labelPo} placeholder="Ex: PO-2024-001" value={po} onChangeText={setPO} />
            <Input
              label={labelIdZepre}
              placeholder="Ex: ZPRE-2024-001"
              value={IdZepre}
              onChangeText={setIdZepre}
            />
          </View>
          <Input
            label="Total de Peças do Lote"
            placeholder="Ex: 1000"
            value={totalPecas}
            onChangeText={handleTotalPecasChange}
            keyboardType="numeric"
          />
          <Text className="text-1xl font-bold text-secondary">Tamanho da amostra (Calculado)</Text>
          <Card className="my-3">
            <Text className="font-bold text-primary">{`${totalPecas === '' ? '0' : totalPecas} peças (${totalPecasPercentual}%)`}</Text>
          </Card>
          <Text className="text-1xl font-bold text-secondary">
            Calculado automaticamente como 6% do total de peças
          </Text>
          <View className="mb-5 flex-1"></View>
          <Button title="Iniciar auditoria" onPress={handleIniciarAuditoria}></Button>
        </Card>

        {/* Segunda coluna */}
        <Card className="h-auto w-full lg:h-full lg:w-1/3">
          <Text className="mb-5 text-2xl font-bold text-white">Processo de Auditoria</Text>
          <View className="mb-5 flex gap-5">
            <View className="flex-row gap-2">
              <Chip text="1" color="primary" />
              <View className="w-full">
                <Text className="text-xl font-bold text-white">Escaneamento</Text>
                <Text className="break-words font-bold text-secondary">
                  Escaneie o código EAN de cada produto usando a câmera do tablet
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <Chip text="2" color="primary" />
              <View className="w-full">
                <Text className="text-1xl font-bold text-white">Validação Visual</Text>
                <Text className="break-words font-bold text-secondary">
                  Compare o produto físico com a imagem de referência do sistema
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <Chip text="3" color="primary" />
              <View className="w-full">
                <Text className="text-1xl font-bold text-white">Registro</Text>
                <Text className="break-words font-bold text-secondary">
                  Aprove ou registre divergências com foto e motivo
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <Chip text="4" color="primary" />
              <View className="w-full">
                <Text className="text-1xl font-bold text-white">Relatório</Text>
                <Text className="text-1xl break-words font-bold text-secondary">
                  Gere automaticamente o relatório final com índice de desvio
                </Text>
              </View>
            </View>
          </View>
          <Card className="mb-2 gap-2 bg-primaryDark">
            <Text className="text-2xl font-bold text-white ">Dica</Text>
            <Text className="text-1xl font-bold text-white ">
              A amostragem é calculada automaticamente seguindo as normas de auditoria logística,
              garantindo representatividade estatística do lote.
            </Text>
          </Card>
        </Card>
      </View>
    </ScrollView>
  );
}
