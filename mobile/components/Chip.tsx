import { View, Text } from 'react-native';

type ChipProps = {
  text: string;
  color?: string;
};

export const Chip = ({ text, color }: ChipProps) => {
  return (
    <View className={`rounded-full  px-4 py-2 bg-${color ?? 'primary'}`}>
      <Text className="text-white">{text}</Text>
    </View>
  );
};
