import { useState, useEffect } from 'react';
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';
import { ImageBackground, Text, View } from 'react-native';
import Card from '~/components/Card';
import ResponsiveLayout from '~/components/ResponsiveLayout';
import { Header } from '~/components/Header';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '~/components/Button';

export default function ValidaProduto() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Parametros
  const numeroEAN = Number(params.numeroEAN); // params vem como string, converta para number
  const produtosOk = Number(params.produtosOk ?? 0);
  const produtosDivergentes = Number(params.produtosDivergentes ?? 0);
  const numeropecas = Number(params.numeropecas ?? 0);

  const handleVoltar = () => {
    router.push('/leituraEAN');
  };

  const handleProdutoOk = () => {
    router.push({
      pathname: '/leituraEAN',
      params: {
        produtosOk: produtosOk + 1,
        produtosDivergentes,
        numeropecas,
      },
    });
  };

  const handleProdutoDivergente = () => {
    router.push('/divergencia')
  }

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    console.log(type, data);
    setScanned(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Solicitando permissão...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

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
            <Text className="text-white">{`Produto ${numeroEAN}`}</Text>
            <Text className="text-secondary">{`Código EAN: ${numeroEAN}`}</Text>
          </Card>
        </>
      }
      left={
        <>
          <Card>
            <View className="mb-5 items-center justify-center">
              <Text className="text-white">Produto esperado (Sistema)</Text>
            </View>
            <View className="items-center justify-center">
              <Card className="mb-5 w-full" style={{ height: 300 }}></Card>
            </View>
            <View>
              <View className="w-full flex-row justify-between">
                <Text className="text-secondary">Produto</Text>
                <Text className="text-white">{`Produto ${numeroEAN}`}</Text>
              </View>
              <View className="w-full flex-row justify-between">
                <Text className="text-secondary">Marca</Text>
                <Text className="text-white">{`Produto genérico`}</Text>
              </View>
              <View className="w-full flex-row justify-between">
                <Text className="text-secondary">EAN</Text>
                <Text className="text-white">{`EAN ${numeroEAN}`}</Text>
              </View>
            </View>
          </Card>
          <Card className=" my-5 " style={{ backgroundColor: '#995910' }}>
            <Text className="mb-2 text-white">Pontos de Verificação:</Text>
            <Text className="text-white">• Estado da embalagem</Text>
            <Text className="text-white">• Produto correto</Text>
            <Text className="text-white">• Presença de danos</Text>
            <Text className="text-white">• Etiquetas e adesivos</Text>
          </Card>

          <View className="my-5 flex-row items-center justify-around">
            <Button onPress={handleProdutoOk} title="Produto OK" color="sucesso" />
            <Button onPress={handleProdutoDivergente} title="Divergência" color="erro" />
          </View>

          <Card>
            <View className="flex-row">
              <View className="w-[50%] ">
                <Text className="text-sucesso text-center" style={{ color: '#23D365' }}>
                  Aprovar se:
                </Text>
                <Text className="text-center text-white">• Produto corresponde à imagem</Text>
                <Text className="text-center text-white">• Embalagem íntegra</Text>
                <Text className="text-center text-white">• Sem danos visíveis</Text>
                <Text className="text-center text-white">• Etiquetas corretas</Text>
              </View>
              <View className="w-[50%] ">
                <Text className="text-center text-white" style={{ color: '#ff0000' }}>
                  Rejeitar se:
                </Text>
                <Text className="text-center text-white">• Produto errado/diferente</Text>
                <Text className="text-center text-white">• Embalagem danificada</Text>
                <Text className="text-center text-white">• Item sujo ou manchado</Text>
                <Text className="text-center text-white">• Faltam componentes</Text>
              </View>
            </View>
          </Card>
        </>
      }
    />
  );
}
