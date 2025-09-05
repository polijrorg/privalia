import { useState, useRef, useEffect } from 'react';
import ResponsiveLayout from '~/components/ResponsiveLayout';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '~/components/Header';
import Card from '~/components/Card';
import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router';
import { Chip } from '~/components/Chip';
import { CameraView } from 'expo-camera';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { cores } from '~/Utils/cores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalStorageModels from '~/types/LocalStorageModels';
import { ButtonType } from '~/types/ButtonTypes';
import { Typography } from '~/Utils/Tipografia';

type FeatherIconName = keyof typeof Feather.glyphMap;

type MotivoDivergencia = {
  divergencia: string;
  icon: FeatherIconName;
  checked: boolean;
};

const arrMotivoDivergencia: MotivoDivergencia[] = [
  { divergencia: 'Embalagem danificada', icon: 'package', checked: false },
  { divergencia: 'Produto sujo', icon: 'frown', checked: false },
  { divergencia: 'Rasgado', icon: 'scissors', checked: false },
  { divergencia: 'Produto trocado', icon: 'rotate-cw', checked: false },
  { divergencia: 'Faltam componentes', icon: 'help-circle', checked: false },
  { divergencia: 'Sem embalagem', icon: 'shopping-bag', checked: false },
  { divergencia: 'Com alarme', icon: 'bell', checked: false },
  { divergencia: 'Outro motivo', icon: 'alert-triangle', checked: false },
];

export default function Divergencia() {
  const router = useRouter();

  const [HabilitarSalvar, setHabilitarSalvar] = useState(true);
  const [campanha, setCampanha] = useState<LocalStorageModels.Campanha | null>(null);
  const [motivos, setMotivos] = useState<MotivoDivergencia[]>(arrMotivoDivergencia);
  const [observacoes, setObservacoes] = useState('');

  const handleCancelar = () => {
    router.push('/validaProduto');
  };

  const handleRegistrarDivergencia = async () => {
    // Se não tiver campanha não é possível validar
    if (!campanha) return;

    // Atualiza o valor aprovados
    const updated = {
      ...campanha,
      divergencias: campanha.divergencias + 1,
      itensAuditados: campanha.itensAuditados + 1,
    };

    // Atualiza na memoria
    await AsyncStorage.setItem('campanha', JSON.stringify(updated));

    router.push('/leituraEAN');
  };

  // Evento que seleciona o motivo da divergência e personaliza o front
  const onHandleMotivo = (index: number) => {
    setHabilitarSalvar(false);
    setMotivos((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          // se já estava selecionado, desmarca
          return { ...item, checked: !item.checked };
        }
        // desmarca todos os outros
        return { ...item, checked: false };
      })
    );
  };

  const onHandleVoltar = () => {
    router.push('/leituraEAN');
  };

  const cameraRef = useRef<CameraView>(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      //const photo = await cameraRef.current.takePictureAsync();
    }
  };

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

        setCampanha(JSON.parse(data));
      } catch {
        Alert.alert('Erro ao carregar dados', 'Tente novamente mais tarde.');
        router.push('/novaauditoria');
      }
    };

    loadData();
  }, [router]);

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
                <Text className={Typography.Titulo2}>Produto xxxx</Text>
                <Text className={Typography.Subtitulo2}>Ean xxxxx</Text>
              </View>
              <Chip text="DIVERGÊNCIA" color={cores.erro} />
            </View>
          </Card>
          <Card>
            <Text className={Typography.Titulo1}>Motivo da Divergência</Text>
            <Text className={Typography.Subtitulo2}>
              Selecione o motivo que melhor descreve o problema
            </Text>
            <View className="mt-5 flex-row flex-wrap justify-center gap-2">
              {motivos.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onHandleMotivo(index)}
                  style={{ width: '20%', height: 128 }}>
                  <Card
                    style={item.checked && { borderColor: '#9372DA' }}
                    className="flex-1 items-center justify-center"
                    color={item.checked ? 'primaryDark' : ''}>
                    <Feather name={item.icon} size={30} color="white" />
                    <Text className={Typography.Titulo3 + ' text-center'}>{item.divergencia}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
          <Card>
            <Text className={Typography.Titulo1}>Evidência Fotográfica</Text>
            <Text className={Typography.Subtitulo1}>
              Capture uma foto do problema para documentação
            </Text>
            <View style={{ height: 300, marginTop: 5 }}>
              <CameraView
                flash="off"
                ref={cameraRef}
                style={{ width: '100%', height: '100%', marginTop: 5 }}
                facing="back"
              />
            </View>
            <Button
              title="Tirar foto"
              iconButton="camera"
              className="mt-5"
              onPress={() => takePhoto()}
            />
          </Card>
          <Card>
            <Text className={Typography.Titulo1}>Observações Adicionais</Text>
            <Text className={Typography.Subtitulo1}>
              Adicione detalhes extras sobre a divergência (opcional)
            </Text>
            <Input
              className="mt-5"
              value={observacoes}
              onChangeText={setObservacoes}
              textArea={4}
              placeholder="Ex: Embalagem apresenta rasgos na lateral direita..."
            />
          </Card>
          <View className="flex-row justify-around">
            <Button
              title="Cancelar"
              variant={ButtonType.Outlined}
              color="foregroundPattern"
              onPress={handleCancelar}
            />
            <Button
              title="Registrar Divergência"
              disabled={HabilitarSalvar}
              onPress={() => handleRegistrarDivergencia()}
            />
          </View>
        </View>
      }
    />
  );
}
