import { forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
} & TextInputProps;

export const Input = forwardRef<View, InputProps>(
  ({ value, onChangeText, label, ...TextInputProps }, ref) => {
    return (
      <View className="mb-6">
        {label && <Text className="mb-2 font-semibold text-white">{label}</Text>}

        <TextInput
          className="rounded-xl border border-gray-300 px-2 py-3 text-white"
          value={value}
          onChangeText={onChangeText}
          // TODO: Alterar a cor para o tema
          placeholderTextColor={'#808A95'}
          {...TextInputProps} // todas as outras props padrão do TextInput
        />
      </View>
    );
  }
);
