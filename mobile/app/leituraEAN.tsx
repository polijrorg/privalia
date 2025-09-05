import { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';

import { Button } from '~/components/Button';

import Card from '~/components/Card';
import { Input } from '~/components/Input';
import { ProgressBar } from '~/components/ProgressBar';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import ResponsiveLayout from '~/components/ResponsiveLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalStorageModels from '~/types/LocalStorageModels';
import { Header } from '~/components/Header';
import { Typography } from '~/Utils/Tipografia';

export default function () {
  const router = useRouter();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const [endereco, setEndereco] = useState('');
  const [scanner, setScanner] = useState('');
  const [mostrarEndereco, setMostrarEndereco] = useState(false);
  const [campanha, setCampanha] = useState<LocalStorageModels.Campanha | null>(null);

  const handleVoltar = () => {
    router.push('/novaauditoria');
  };

  // código que roda quando essa página é aberta
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('campanha');

        // Se não houver dados
        if (!data) {
          Alert.alert('Erro ao carregar dados', 'Tente novamente mais tarde.');
          router.push('/novaauditoria');
          return;
        }

        // Converte o JSON para um objeto (como o setcampanha e assincrono, pode
        //ocorrer problema na renderização do input de endereco)
        const parsed = JSON.parse(data);

        setCampanha(parsed);

        // Utiliza o objeto parsed porque o usestate funciona de forma assincrona
        if (parsed.processoAuditado === 'blocado') {
          setMostrarEndereco(true);
        } else {
          setMostrarEndereco(false);
        }
      } catch {
        Alert.alert('Erro ao carregar dados', 'Tente novamente mais tarde.');
        router.push('/novaauditoria');
      }
    };

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    loadData();
  }, [router, mostrarEndereco]);

  if (hasPermission === null) {
    return <Text>Solicitando permissão...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  const onHandleEscanear = () => {
    if (scanner.trim() === '') {
      Alert.alert('Erro', 'Preencha o código EAN');
      return;
    }

    if (endereco.trim() === '' && campanha?.processoAuditado === 'blocado') {
      Alert.alert('Erro', 'Preencha o endereço');
      return;
    }

    router.push({
      pathname: '/validaProduto',
      params: {
        numeroEAN: scanner,
      },
    });
  };

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    setScanner(data);
  };

  const handleScannerChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setScanner(numericValue);
  };

  return (
    <ResponsiveLayout
      header={
        <Header
          titulo="Escaneamento"
          onHandleVoltar={handleVoltar}
          subTitulo={campanha?.nome ?? ''}></Header>
      }
      left={
        <>
          <Card>
            <View className="flex-row items-center gap-5">
              <Feather name="camera" size={30} color="white" />
              <Text className={Typography.Titulo1}>Scanner EAN</Text>
            </View>
            <Text className={Typography.Subtitulo2 + ' mb-5'}>
              Escaneie o código de barras ou digite manualmente
            </Text>
            <Card className="align-center justify-center" style={{ height: 300 }}>
              {!scanned && (
                <CameraView
                  style={{ width: '100%', height: '100%' }}
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ['ean13', 'ean8', 'qr'],
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
                  keyboardType="numeric"
                  value={scanner}
                  onChangeText={handleScannerChange}
                />
              </View>
              <Button title="Escanear" className="w-[30%]" onPress={onHandleEscanear}></Button>
            </View>
            {mostrarEndereco ? (
              <Input
                label="Endereço (13 dígitos)"
                placeholder="Digite o endereço"
                value={endereco}
                onChangeText={setEndereco}
              />
            ) : (
              ''
            )}

            <Text className={Typography.Titulo3}>Códigos de teste:</Text>
            <Text className={Typography.Subtitulo3}>• 7891234567890 (Camiseta Preta)</Text>
            <Text className={Typography.Subtitulo3}>• 7891234567891 (Calça Jeans)</Text>
          </Card>
        </>
      }
      right={
        <View className="mt-5 gap-5">
          <Card>
            <Text className={Typography.Titulo1}>Progresso da auditoria</Text>
            <ProgressBar
              total={campanha?.amostragem ?? 0}
              current={campanha?.itensAuditados ?? 0}></ProgressBar>
            <View className="flex-row justify-around">
              <Card
                color="sucess"
                className="flex flex-col items-center justify-center bg-green-500">
                <Text className={Typography.Titulo1}>{campanha?.aprovados}</Text>
                <Text className={Typography.Titulo1}>Aprovados</Text>
              </Card>
              <Card color="sucess" className="flex flex-col items-center justify-center bg-red-500">
                <Text className={Typography.Titulo1}>{campanha?.divergencias}</Text>
                <Text className={Typography.Titulo1}>Reprovados</Text>
              </Card>
            </View>
          </Card>
          <Card>
            <Text className={Typography.Titulo1 + ' mb-5'}>Últimos itens</Text>
            <View className="align-center flex justify-center">
              <Text className={Typography.Subtitulo1}>Nenhum item escaneado ainda</Text>
            </View>
          </Card>
        </View>
      }
    />
  );
}
