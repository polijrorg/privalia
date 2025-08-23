import { Stack } from 'expo-router';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';

import Card from '~/components/Card';
import { Button } from '~/components/Button';
import { Chip } from '~/components/Chip';
import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const handleIniciarNovaAuditoria = () => {
    // Navega para a tela principal
    router.push('/novaauditoria');
  };

  return (
    <SafeAreaView className="flex-1 p-6 bg-backgroundPattern">
      <ScrollView
        className="pb-safe"
        contentContainerStyle={{ flexGrow: 1 }}>
        <Stack.Screen options={{ title: 'Home' }} />
        <View className="h-[10%] flex-row items-center justify-between pb-8">
          <View className="">
            <Text className="text-2xl font-bold text-white">Dashboard</Text>
            <Text className="text-1xl font-bold text-secondary">
              Auditoria logística • Privalia
            </Text>
          </View>
          <View>
            <View className="flex-row gap-2">
              <Chip text="Analista: João Silva" color="foregroundPattern"></Chip>
              <View className="rounded-full bg-primary p-1">
                <Feather name="user" size={24} color="black" />
              </View>
            </View>
          </View>
        </View>

        <View className="mb-6 flex-row flex-wrap items-center justify-center gap-2">
          <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
            <Card title="Auditorias Hoje" value="3"></Card>
          </View>
          <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
            <Card title="Desvio Médio" value="2.1%"></Card>
          </View>
          <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
            <Card title="Itens auditados" value="1,847"></Card>
          </View>
          <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
            <Card title="Eficiência" value="+38%"></Card>
          </View>
        </View>

        <View className="w-full flex-1 flex-col gap-2 lg:flex-row">
          <Card className="w-full lg:w-[65%]">
            <View className="h-auto w-full justify-between">
              <View>
                <Text className="text-2xl font-bold text-white ">Nova auditoria</Text>
                <Text className="text-1xl mb-8 font-bold text-secondary ">
                  Inicie uma nova auditoria de lote logístico
                </Text>
              </View>
              <Card className="bg-backgroundPattern3 mb-2 gap-2 ">
                <Text className="text-2xl font-bold text-white ">Processo padrão</Text>
                <View className="flex-row gap-2">
                  <Feather name="box" size={16} color="#808A95" />
                  <Text className="text-1xl font-bold text-secondary">
                    Escaneamento por código EAN
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <Feather name="check-circle" size={16} color="#808A95" />
                  <Text className="text-1xl font-bold text-secondary">
                    Validação visual automática
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <Feather name="camera" size={16} color="#808A95" />
                  <Text className="text-1xl font-bold text-secondary">
                    Registro de divergências com foto
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <Feather name="trending-up" size={16} color="#808A95" />
                  <Text className="text-1xl font-bold text-secondary">
                    Relatório automático com PDF/Excel
                  </Text>
                </View>
              </Card>

              <Button
                title="Iniciar nova auditoria"
                iconButton="plus"
                onPress={handleIniciarNovaAuditoria}></Button>
            </View>
          </Card>
          <View className="h-auto w-full">
            <Card>
              <Text className="mb-8 text-2xl font-bold text-white">Auditorias recentes</Text>
              <View className=" gap-4">
                <Card>
                  <View className="flex-row justify-between">
                    <Text className="text-1xl font-bold text-white">Lote PRIV-2024-001</Text>
                    <View className="rounded-full bg-primary p-2 ">
                      <Text className="text-1xm font-bold text-white ">Concluido</Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-1xm font-bold text-white">15/01/2024</Text>
                    <Text className="text-1xm white font-bold text">Desvio: 1.8%</Text>
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
                    <Text className="text-1xm white font-bold text">Desvio: 1.8%</Text>
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
                    <Text className="text-1xm white font-bold text">Desvio: 1.8%</Text>
                  </View>
                </Card>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
