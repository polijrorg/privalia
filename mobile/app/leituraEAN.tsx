import { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button } from '~/components/Button';

import Card from '~/components/Card';
import { Input } from '~/components/Input';
import { ProgressBar } from '~/components/ProgressBar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function () {
  const router = useRouter();

  const [endereco, setEndereco] = useState('');
  const [scanner, setScanner] = useState('');
  const params = useLocalSearchParams();

  const nomeCampanha = params.nomecampanha; // vai ser string
  const numeroPecas = Number(params.numeropecas); // params vem como string, converta para number
  const processoAuditoria = params.processoAuditoria; // params vem como string, converta para number
  const [mostrarEndereco, setMostrarEndereco] = useState(false);

  const handleVoltar = () => {
    router.push('/novaauditoria');
  };

  // código que roda quando essa página é aberta
  useEffect(() => {
    console.log(processoAuditoria);
    processoAuditoria === 'blocado' ? setMostrarEndereco(true) : setMostrarEndereco(false);
  }, []);

  return (
    <ScrollView
      className="flex-1 flex-col bg-backgroundPattern p-20 py-10"
      contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mb-5 flex-row gap-5">
        <Button title="Voltar" onPress={handleVoltar}></Button>
        <View>
          <Text className="text-2xl font-bold text-white">Escaneamento</Text>
          <Text className="text-2xl font-bold text-secondary">{nomeCampanha}</Text>
        </View>
      </View>

      <View className="flex h-full w-full flex-col gap-4 p-4 lg:flex-row">
        {/* Coluna 1 - Ocupa 70% em telas grandes */}
        <View className="w-full lg:w-[70%] ">
          <Card className="lg:h-[100%]">
            <View className="flex-row gap-5">
              <Feather name="camera" size={30} color="white" />
              <Text className="text-xl font-bold text-white">Scanner EAN</Text>
            </View>
            <Text className="text-xl font-bold text-white">
              Escaneie o código de barras ou digite manualmente
            </Text>
            <Card className="flex-row items-center justify-center gap-2 p-40">
              <Feather name="camera" size={130} color="white" />
            </Card>
            <View className="my-4 h-px w-full bg-borderPattern" />
            <View className="w-full flex-row items-center justify-center gap-4">
              <View className="w-[70%]">
                <Input
                  label="Código EAN manual"
                  placeholder="Digite o código EAN"
                  value={scanner}
                  onChangeText={setScanner}
                />
              </View>
              <Button title="Escanear" className="h-[50%] w-[30%]"></Button>
            </View>
            {mostrarEndereco ? (
              <Input
                label="Endereço (13 dígitos)"
                placeholder="Digite o endereço"
                value={endereco}
                onChangeText={() => setEndereco(endereco)}
              />
            ) : (
              ''
            )}

            <Text className="text-sm font-bold text-white">Códigos de teste:</Text>
            <Text className="text-sm font-bold text-secondary">
              • 7891234567890 (Camiseta Preta)
            </Text>
            <Text className="text-sm font-bold text-secondary">• 7891234567891 (Calça Jeans)</Text>
          </Card>
        </View>

        {/* Coluna 2 - Ocupa 30% em telas grandes */}
        <View className="w-full gap-5 lg:w-[30%]">
          <Card>
            <Text className="text-xl font-bold text-white">Progresso da auditoria</Text>
            <ProgressBar total={numeroPecas} current={0}></ProgressBar>
            <View className="flex-row justify-around">
              <Card
                color="sucess"
                className="flex flex-col items-center justify-center bg-green-500">
                <Text className="text-sucess text-lg font-bold">0</Text>
                <Text className="text-sucess text-lg font-bold">Aprovados</Text>
              </Card>
              <Card color="sucess" className="flex flex-col items-center justify-center bg-red-500">
                <Text className="text-error text-lg font-bold">0</Text>
                <Text className="text-error text-lg font-bold">Reprovados</Text>
              </Card>
            </View>
          </Card>
          <Card>
            <Text className="text-xl font-bold text-white">Últimos itens</Text>
            <View className="align-center flex justify-center">
              <Text className="m-5 text-xl font-bold text-secondary">
                Nenhum item escaneado ainda
              </Text>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
