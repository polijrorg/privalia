import { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import Card from '~/components/Card';
import ResponsiveLayout from '~/components/ResponsiveLayout';
import { Header } from '~/components/Header';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '~/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalStorageModels from '~/types/LocalStorageModels';
import { Typography } from '~/Utils/Tipografia';

export default function ValidaProduto() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const numeroEAN = Number(params.numeroEAN); // params vem como string, converta para number

  const [campanha, setCampanha] = useState<LocalStorageModels.Campanha | null>(null);

  const handleVoltar = () => {
    router.push('/leituraEAN');
  };

  const handleProdutoOk = async () => {
    // Se não tiver campanha não é possível validar
    if (!campanha) return;

    // Atualiza o valor aprovados
    const updated = {
      ...campanha,
      aprovados: campanha.aprovados + 1,
      itensAuditados: campanha.itensAuditados + 1,
    };

    // Atualiza na memoria
    await AsyncStorage.setItem('campanha', JSON.stringify(updated));

    router.push('/leituraEAN');
  };

  const handleProdutoDivergente = () => {
    router.push({
      pathname: '/divergencia',
      params: {
        numeroEAN: numeroEAN,
      },
    });
  };

  // TODO: Verificar o fluxo ao negar permissão de câmera
  useEffect(() => {
    const loadCampanha = async () => {
      try {
        const data = await AsyncStorage.getItem('campanha');

        // Se não houver dados
        if (!data) {
          Alert.alert('Erro ao carregar dados', 'Tente novamente mais tarde.');
          router.push('/novaauditoria');
          return;
        }

        setCampanha(JSON.parse(data));
      } catch {
        Alert.alert('Erro ao carregar dados', 'Tente novamente mais tarde.');
        router.push('/novaauditoria');
      }
    };

    loadCampanha(); // chama a função assíncrona
  }, [router]);

  return (
    <ResponsiveLayout
      header={
        <>
          <Header
            titulo="Validação Visual"
            subTitulo="Compare o produto físico com a referência"
            onHandleVoltar={handleVoltar}
          />

          <Card>
            <Text className={Typography.Titulo2}>{`Produto ${numeroEAN}`}</Text>
            <Text className={Typography.Subtitulo2}>{`Código EAN: ${numeroEAN}`}</Text>
          </Card>
        </>
      }
      left={
        <>
          <Card>
            <View className="mb-5 items-center justify-center">
              <Text className={Typography.Titulo1}>Produto esperado (Sistema)</Text>
            </View>
            <View className="items-center justify-center">
              <Card className="mb-5 w-full" style={{ height: 300 }}></Card>
            </View>
            <View>
              <View className="w-full flex-row justify-between">
                <Text className={Typography.Subtitulo2}>Produto</Text>
                <Text className={Typography.Titulo2}>{`Produto ${numeroEAN}`}</Text>
              </View>
              <View className="w-full flex-row justify-between">
                <Text className={Typography.Subtitulo2}>Marca</Text>
                <Text className={Typography.Titulo2}>{`Produto genérico`}</Text>
              </View>
              <View className="w-full flex-row justify-between">
                <Text className={Typography.Subtitulo2}>EAN</Text>
                <Text className={Typography.Titulo2}>{`EAN ${numeroEAN}`}</Text>
              </View>
            </View>
          </Card>
          <Card className=" my-5 " style={{ backgroundColor: '#995910' }}>
            <Text className={Typography.Titulo2 + ' mb-2 text-center'}>Pontos de Verificação:</Text>
            <Text className={Typography.Titulo3}>• Estado da embalagem</Text>
            <Text className={Typography.Titulo3}>• Produto correto</Text>
            <Text className={Typography.Titulo3}>• Presença de danos</Text>
            <Text className={Typography.Titulo3}>• Etiquetas e adesivos</Text>
          </Card>

          <View className="my-5 flex-row items-center justify-around">
            <Button onPress={() => handleProdutoOk()} title="Produto OK" color="sucesso" />
            <Button onPress={handleProdutoDivergente} title="Divergência" color="erro" />
          </View>

          <Card>
            <View className="flex-row">
              <View className="w-[50%] ">
                <Text className={Typography.Titulo1 + ' text-center'} style={{ color: '#23D365' }}>
                  Aprovar se:
                </Text>
                <Text className={Typography.Titulo2 + ' text-center'}>
                  • Produto corresponde à imagem
                </Text>
                <Text className={Typography.Titulo2 + ' text-center'}>• Embalagem íntegra</Text>
                <Text className={Typography.Titulo2 + ' text-center'}>• Sem danos visíveis</Text>
                <Text className={Typography.Titulo2 + ' text-center'}>• Etiquetas corretas</Text>
              </View>
              <View className="w-[50%] ">
                <Text className={Typography.Titulo1 + ' text-center'} style={{ color: '#ff0000' }}>
                  Rejeitar se:
                </Text>
                <Text className={Typography.Titulo2 + ' text-center'}>
                  • Produto errado/diferente
                </Text>
                <Text className={Typography.Titulo2 + ' text-center'}>• Embalagem danificada</Text>
                <Text className={Typography.Titulo2 + ' text-center'}>• Item sujo ou manchado</Text>
                <Text className={Typography.Titulo2 + ' text-center'}>• Faltam componentes</Text>
              </View>
            </View>
          </Card>
        </>
      }
    />
  );
}
