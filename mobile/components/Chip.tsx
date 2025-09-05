import { View, Text } from 'react-native';
import { cores } from '~/Utils/cores';

type ChipProps = {
  text: string;
  color?: (typeof cores)[keyof typeof cores];
};

export const Chip = ({ text, color = 'primary' }: ChipProps) => {
  return (
    <View
      className={'justify-center rounded-full px-4 py-2'}
      style={color && { backgroundColor: color }}>
      <Text className="font-bold text-white">{text}</Text>
    </View>
  );
};
