import { View, Text } from 'react-native';
import { Button } from '~/components/Button';
import { Typography } from '~/Utils/Tipografia';

type HeaderProps = {
  titulo: string;
  subTitulo: string;
  onHandleVoltar?: () => void;
};

export const Header = ({ titulo, subTitulo, onHandleVoltar }: HeaderProps) => {
  return (
    <View className="mb-5 flex-row gap-5">
      {onHandleVoltar !== undefined && <Button title="Voltar" onPress={onHandleVoltar}></Button>}
      <View>
        <Text className={Typography.Titulo1}>{titulo}</Text>
        <Text className={Typography.Subtitulo1}>{subTitulo}</Text>
      </View>
    </View>
  );
};
