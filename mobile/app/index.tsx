import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import Card from '~/components/Card';
import { Button } from '~/components/Button';

export default function Home() {
  return (
    <>
      <View className="bg-backgroundPattern flex-1 p-6">
        <Stack.Screen options={{ title: 'Home' }} />
        <View className="h-[10%] flex-row items-center justify-between pb-8">
          <View className="">
            <Text className="text-2xl font-bold text-white">Dashboard</Text>
            <Text className="text-1xl text-secondary font-bold">
              Auditoria logística • Privalia
            </Text>
          </View>
          <View>
            <View className="">
              <Text className="text-2xl font-bold text-white">Analista: João Silva</Text>
            </View>
          </View>
        </View>

        <View className="mt-[10%] h-[20%] flex-row flex-wrap items-center justify-center ">
          <View className=" w-1/4 p-2  ">
            <Card title="Auditorias Hoje" value="3"></Card>
          </View>
          <View className=" w-1/4 p-2 ">
            <Card title="Desvio Médio" value="2.1%" color="primary"></Card>
          </View>
          <View className=" w-1/4 p-2 ">
            <Card title="Itens auditados" value="1,847"></Card>
          </View>
          <View className=" w-1/4 p-2 ">
            <Card title="Eficiência" value="+38%" color="primary"></Card>
          </View>
        </View>

        <View className="w-full flex-1 flex-row">
          <Card className="w-1/2">
            <View className="h-[100%] w-full flex-1 justify-between">
              <View>
                <Text className="text-2xl font-bold text-white ">Nova auditoria</Text>
                <Text className="text-1xl text-secondary mb-8 font-bold ">
                  Inicie uma nova auditoria de lote logístico
                </Text>
              </View>
              <Card className="bg-backgroundPattern2 mb-8 h-[70%] ">
                <Text className="text-2xl font-bold text-white">Processo padrão</Text>
                <Text className="text-1xl text-secondary font-bold">
                  Escaneamento por código EAN
                </Text>
                <Text className="text-1xl text-secondary font-bold">
                  Validação visual automática
                </Text>
                <Text className="text-1xl text-secondary font-bold">
                  Registro de divergências com foto
                </Text>
                <Text className="text-1xl text-secondary font-bold">
                  Relatório automático com PDF/Exce
                </Text>
              </Card>

              <Button
                title="Iniciar nova auditoria"
                className="rounded-xl bg-primary p-2 text-white "></Button>
            </View>
          </Card>
          <View className="w-1/2">
            <Card>
              <Text className="text-2xl font-bold text-white mb-8">Auditorias recentes</Text>

              <Card>
                <View className="flex-row justify-between">
                  <Text className="text-1xl font-bold text-white">Lote PRIV-2024-001</Text>
                  <View className="rounded-full bg-primary p-2 ">
                    <Text className="text-1xm font-bold text-white ">Concluido</Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-1xm font-bold text-white">15/01/2024</Text>
                  <Text className="text-1xm text white font-bold">Desvio: 1.8%</Text>
                </View>
              </Card>
              <Card>
                <View className="flex-row justify-between">
                  <Text className="text-1xl font-bold text-white">Lote PRIV-2024-001</Text>
                  <View className="rounded-full bg-primary p-2 ">
                    <Text className="text-1xm font-bold text-white ">Concluido</Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-1xm font-bold text-white">15/01/2024</Text>
                  <Text className="text-1xm text white font-bold">Desvio: 1.8%</Text>
                </View>
              </Card>
              <Card>
                <View className="flex-row justify-between">
                  <Text className="text-1xl font-bold text-white">Lote PRIV-2024-001</Text>
                  <View className="rounded-full bg-primary p-2 ">
                    <Text className="text-1xm font-bold text-white ">Concluido</Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-1xm font-bold text-white">15/01/2024</Text>
                  <Text className="text-1xm text white font-bold">Desvio: 1.8%</Text>
                </View>
              </Card>
              <Card>
                <View className="flex-row justify-between">
                  <Text className="text-1xl font-bold text-white">Lote PRIV-2024-001</Text>
                  <View className="rounded-full bg-primary p-2 ">
                    <Text className="text-1xm font-bold text-white ">Concluido</Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-1xm font-bold text-white">15/01/2024</Text>
                  <Text className="text-1xm text white font-bold">Desvio: 1.8%</Text>
                </View>
              </Card>
              <Card>
                <View className="flex-row justify-between">
                  <Text className="text-1xl font-bold text-white">Lote PRIV-2024-001</Text>
                  <View className="rounded-full bg-primary p-2 ">
                    <Text className="text-1xm font-bold text-white ">Concluido</Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-1xm font-bold text-white">15/01/2024</Text>
                  <Text className="text-1xm text white font-bold">Desvio: 1.8%</Text>
                </View>
              </Card>
            </Card>
          </View>
        </View>
      </View>
    </>
  );
}
