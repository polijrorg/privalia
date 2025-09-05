import { forwardRef, useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Typography } from '~/Utils/Tipografia';

export type Option = { label: string; value: string };

type InputProps = {
  value: string;
  onChangeText?: (text: string) => void;
  label?: string;
  type?: 'text' | 'select';
  options?: Option[]; // ← usado no select
  onSelectChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  textArea?: number;
} & TextInputProps;

export const Input = forwardRef<View, InputProps>(
  (
    {
      value,
      onChangeText,
      label,
      type = 'text',
      options = [],
      onSelectChange,
      className = '',
      placeholder = '',
      textArea,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] = useState(value);

    function handleSelectChange(value: string) {
      setSelected(value);
      onSelectChange?.(value);
    }

    return (
      <View className={`mb-6 ${className}`}>
        {label && <Text className={Typography.Titulo3 + 'mb-2 '}>{label}</Text>}

        {type === 'text' ? (
          <TextInput
            ref={ref as any}
            className="w-full rounded-xl border border-gray-300 px-2 py-3 text-white"
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={'#808A95'}
            placeholder={placeholder}
            multiline={textArea ? true : false}
            numberOfLines={textArea ? textArea : undefined}
            {...props}
          />
        ) : (
          <View className="w-full rounded-xl border border-gray-300 bg-foregroundPattern px-1">
            <Picker
              selectedValue={selected}
              onValueChange={handleSelectChange}
              style={{ color: 'white', padding: 0, borderRadius: 16 }}>
              {options.map((opt) => (
                <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
              ))}
            </Picker>
          </View>
        )}
      </View>
    );
  }
);
