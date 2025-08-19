import { forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from 'react-native';
import { ButtonType } from '~/types/ButtonTypes';

import Feather from '@expo/vector-icons/Feather';

type FeatherIconName = keyof typeof Feather.glyphMap;

type ButtonProps = {
  title: string;
  variant?: ButtonType;
  isLoading?: boolean;
  className?: string;
  iconButton?: FeatherIconName;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      title,
      variant = ButtonType.Filled,
      iconButton,
      isLoading = false,
      className,
      ...touchableProps
    },
    ref
  ) => {
    let containerClass = '';
    let textClass = '';

    switch (variant) {
      case ButtonType.Text:
        containerClass = ' bg-transparent ';
        textClass = ' text-primary ';
        break;

      case ButtonType.Outlined:
        containerClass = ' border border-primary bg-transparent ';
        textClass = ' text-primary ';
        break;

      case ButtonType.Filled:
      default:
        containerClass = ' bg-primary ';
        textClass = ' text-white ';
        break;
    }

    containerClass += className;
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`align-center items-center justify-center rounded-xl p-4 shadow-md ${containerClass}`}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row items-center justify-center gap-4">
            {iconButton && (
              <Feather name={iconButton} size={16} color="white" className="font-bold" />
            )}
            <Text className={`text-center text-lg font-semibold ${textClass}`}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
