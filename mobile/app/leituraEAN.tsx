import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';

import { Button } from '~/components/Button';

import Card from '~/components/Card';
import { Input } from '~/components/Input';
import { ProgressBar } from '~/components/ProgressBar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import ResponsiveLayout from '~/components/ResponsiveLayout';

export default function () {
  const router = useRouter();

  const [endereco, setEndereco] = useState('');
  const [scanner, setScanner] = useState('');
  const params = useLocalSearchParams();

  const nomeCampanha = params.nomecampanha; // vai ser string
  const numeroPecas = Number(params.numeropecas); // params vem como string, converta para number
  const processoAuditoria = params.processoAuditoria; // params vem como string, converta para number
  const [produtosOk, setProdutosOk] = useState(Number(params.produtosOk ?? 0));
  const [produtosDivergentes, setProdutosDivergentes] = useState(
    Number(params.produtosDivergentes ?? 0)
  );

  const [mostrarEndereco, setMostrarEndereco] = useState(false);
  const [produtosAuditados, setProdutosAuditados] = useState(0);

  const handleVoltar = () => {
    router.push('/novaauditoria');
  };

  // código que roda quando essa página é aberta
  useEffect(() => {
    setProdutosAuditados(produtosOk + produtosDivergentes);
    processoAuditoria === 'blocado' ? setMostrarEndereco(true) : setMostrarEndereco(false);
  }, []);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

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

  const onHandleEscanear = () => {
    router.push({
      pathname: '/validaProduto',
      params: {
        numeroEAN: scanner,
        produtosOk: Number(produtosOk),
        produtoDivergentes: Number(produtosDivergentes),
        numeropecas: Number(numeroPecas),
      },
    });
  };

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    setScanner(data);
  };

  return (
    <ResponsiveLayout
      header={
        <View className="mb-5 flex-row gap-5">
          <Button title="Voltar" onPress={handleVoltar}></Button>
          <View>
            <Text className="text-2xl font-bold text-white">Escaneamento</Text>
            <Text className="text-2xl font-bold text-secondary">{nomeCampanha}</Text>
          </View>
        </View>
      }
      left={
        <>
          <Card>
            <View className="flex-row gap-5">
              <Feather name="camera" size={30} color="white" />
              <Text className="text-xl font-bold text-white">Scanner EAN</Text>
            </View>
            <Text className="text-xl font-bold text-white">
              Escaneie o código de barras ou digite manualmente
            </Text>
            <Card className="align-center justify-center" style={{ height: 300 }}>
              {!scanned && (
                <CameraView
                  style={{ width: '100%', height: '100%' }}
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ['ean13', 'ean8'],
                  }}
                  onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
              )}
              {scanned && <Button title={'Tentar novamente'} onPress={() => setScanned(false)} />}
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
              <Button title="Escanear" className="w-[30%]" onPress={onHandleEscanear}></Button>
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
        </>
      }
      right={
        <View className="mt-5 gap-5">
          <Card>
            <Text className="text-xl font-bold text-white">Progresso da auditoria</Text>
            <ProgressBar total={numeroPecas} current={produtosAuditados}></ProgressBar>
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
      }
    />
  );
}
