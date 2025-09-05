import { Text, View } from 'react-native';

import Card from '~/components/Card';
import { Button } from '~/components/Button';
import { Chip } from '~/components/Chip';
import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router';
import ResponsiveLayout from '~/components/ResponsiveLayout';
import { Header } from '~/components/Header';
import { cores } from '~/Utils/cores';
import { Typography } from '~/Utils/Tipografia';

export default function Home() {
  const router = useRouter();

  const handleIniciarNovaAuditoria = () => {
    // Navega para a tela principal
    router.push('/novaauditoria');
  };

  return (
    <ResponsiveLayout
      header={
        <View className="flex-row flex-wrap justify-between">
          <Header titulo="Dashboard" subTitulo="Auditoria logística • Privalia" />
          <View className="flex-row flex-wrap items-center gap-2">
            <Chip text="Analista: João Silva" color={cores.foregroundPattern}></Chip>
            <View className="rounded-full bg-primary p-1">
              <Feather name="user" size={24} color="black" />
            </View>
          </View>
        </View>
      }
      left={
        <>
          <View className="mb-5 flex-row flex-wrap items-center justify-center gap-5">
            <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
              <Card>
                <Text className={Typography.Subtitulo2}>Auditorias Hoje</Text>
                <Text className={Typography.Titulo1}>3</Text>
              </Card>
            </View>
            <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
              <Card>
                <Text className={Typography.Subtitulo2}>Desvio Médio</Text>
                <Text className={Typography.Titulo1}>2.1%</Text>
              </Card>
            </View>
            <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
              <Card>
                <Text className={Typography.Subtitulo2}>Itens auditados</Text>
                <Text className={Typography.Titulo1}>1,847</Text>
              </Card>
            </View>
            <View className="min-w-full flex-1 sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]">
              <Card>
                <Text className={Typography.Subtitulo2}>Eficiência</Text>
                <Text className={Typography.Titulo1}>+38%</Text>
              </Card>
            </View>
          </View>

          <View className="w-full flex-1 flex-col gap-2 lg:flex-row">
            <Card className="mb-5 w-full lg:w-[65%]">
              <View className="h-auto w-full justify-between">
                <View>
                  <Text className={Typography.Titulo1}>Nova auditoria</Text>
                  <Text className={Typography.Subtitulo2 + ' mb-5'}>
                    Inicie uma nova auditoria de lote logístico
                  </Text>
                </View>
                <Card className="bg-backgroundPattern3 mb-2 gap-2 ">
                  <Text className={Typography.Titulo1}>Processo padrão</Text>
                  <View className="flex-row items-center gap-2">
                    <Feather name="box" size={16} color="#808A95" />
                    <Text className={Typography.Subtitulo2}>Escaneamento por código EAN</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Feather name="check-circle" size={16} color="#808A95" />
                    <Text className={Typography.Subtitulo2}>Validação visual automática</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Feather name="camera" size={16} color="#808A95" />
                    <Text className={Typography.Subtitulo2}>Registro de divergências com foto</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Feather name="trending-up" size={16} color="#808A95" />
                    <Text className={Typography.Subtitulo2}>
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
                <Text className={Typography.Titulo1 + ' mb-5'}>Auditorias recentes</Text>
                <View className=" gap-4">
                  <Card>
                    <View className="flex-row justify-between">
                      <Text className={Typography.Titulo2}>Lote PRIV-2024-001</Text>
                      <Chip text="Concluido" color={cores.primary}></Chip>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={Typography.Titulo3}>15/01/2024</Text>
                      <Text className={Typography.Titulo3}>Desvio: 1.8%</Text>
                    </View>
                  </Card>
                  <Card>
                    <View className="flex-row justify-between">
                      <Text className={Typography.Titulo2}>Lote PRIV-2024-001</Text>
                      <Chip text="Concluido" color={cores.primary}></Chip>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={Typography.Titulo3}>15/01/2024</Text>
                      <Text className={Typography.Titulo3}>Desvio: 1.8%</Text>
                    </View>
                  </Card>
                  <Card>
                    <View className="flex-row justify-between">
                      <Text className={Typography.Titulo2}>Lote PRIV-2024-001</Text>
                      <Chip text="Concluido" color={cores.primary}></Chip>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={Typography.Titulo3}>15/01/2024</Text>
                      <Text className={Typography.Titulo3}>Desvio: 1.8%</Text>
                    </View>
                  </Card>
                </View>
              </Card>
            </View>
          </View>
        </>
      }
    />
  );
}
