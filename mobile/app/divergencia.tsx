import ResponsiveLayout from '~/components/ResponsiveLayout';
import { Text, View } from 'react-native';
import { Header } from '~/components/Header';
import Card from '~/components/Card';
import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router';
import { Chip } from '~/components/Chip';
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';

export default function Details() {
  const router = useRouter();

  const onHandleVoltar = () => {
    router.push('/leituraEAN');
  };
  return (
    <ResponsiveLayout
      header={
        <Header
          onHandleVoltar={onHandleVoltar}
          titulo="Registro de Divergência"
          subTitulo="Documente o problema encontrado"
        />
      }
      left={
        <View className="gap-5">
          <Card>
            <View className="flex-row justify-between">
              <View className="">
                <Text className="text-white">Produto xxxx</Text>
                <Text className="text-secondary">Ean xxxxx</Text>
              </View>
              <Chip text="Divergência" color="erro" />
            </View>
          </Card>
          <Card>
            <Text className="text-white">Motivo da Divergência</Text>
            <Text className="text-secondary">
              Selecione o motivo que melhor descreve o problema
            </Text>
            <View className="mt-5 flex flex-row flex-wrap gap-1 justify-center">
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Embalagem danificada</Text>
              </Card>
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Produto sujo</Text>
              </Card>
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Rasgado</Text>
              </Card>
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Produto trocado</Text>
              </Card>
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Faltam componentes</Text>
              </Card>
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Sem embalagem</Text>
              </Card>
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Com alarme</Text>
              </Card>
              <Card className="items-center justify-center w-1/3 h-32 ">
                <Feather name="camera" size={30} color="white" />
                <Text className="text-white">Outro motivo</Text>
              </Card>
            </View>
          </Card>
          <Card>
            <Text className="text-white">Evidência Fotográfica</Text>
            <Text className="text-secondary">Capture uma foto do problema para documentação</Text>
            <View style={{ height: 300, marginTop: 5 }}>
              <CameraView style={{ width: '100%', height: '100%', marginTop: 5 }} facing="back" />
            </View>
            <Button title="Tirar foto" iconButton="camera" className='mt-5' />
          </Card>
          <Card>
            <Text className="text-white">Observações Adicionais</Text>
            <Text className="text-secondary">
              Adicione detalhes extras sobre a divergência (opcional)
            </Text>
            <Input className='mt-5' value="" placeholder="Ex: Embalagem apresenta rasgos na lateral direita..." />
          </Card>
        </View>
      }
    />
  );
}
