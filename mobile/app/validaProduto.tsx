import { useState, useEffect } from 'react';
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';
import { Text, View } from 'react-native';
import Card from '~/components/Card';
import ResponsiveLayout from '~/components/ResponsiveLayout';

export default function ValidaProduto() {
  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    console.log(type, data);
    setScanned(true);
  };

  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

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
        <View>
          <Text>Escaneie o código de barras</Text>
        </View>
      }
      left={
        <View>
          <Card>
            <Text>Escaneie o código de barras</Text>
          </Card>
        </View>
      }
      right={
        <View>
          <Card>
            <Text>Escaneie o código de barras</Text>
          </Card>
        </View>
      }
    />
  );
}
