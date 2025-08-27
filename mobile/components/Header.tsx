import { View, Text } from 'react-native';
import { Button } from '~/components/Button';

type HeaderProps = {
  titulo: string;
  subTitulo: string;
  onHandleVoltar: () => void;
};

export const Header = ({ titulo, subTitulo, onHandleVoltar }: HeaderProps) => {
  return (
    <View className="mb-5 flex-row gap-5">
      <Button title="Voltar" onPress={onHandleVoltar}></Button>
      <View>
        <Text className="text-2xl font-bold text-white">{titulo}</Text>
        <Text className="text-2xl font-bold text-secondary">{subTitulo}</Text>
      </View>
    </View>
  );
};
