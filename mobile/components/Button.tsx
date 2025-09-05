import { forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ButtonType } from '~/types/ButtonTypes';

import Feather from '@expo/vector-icons/Feather';
import { Typography } from '~/Utils/Tipografia';

type FeatherIconName = keyof typeof Feather.glyphMap;

type ButtonProps = {
  title: string;
  variant?: ButtonType;
  isLoading?: boolean;
  className?: string;
  iconButton?: FeatherIconName;
  color?: string;
  styleClass?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      title,
      variant = ButtonType.Filled,
      iconButton,
      isLoading = false,
      className,
      color,
      styleClass,
      styleText,
      ...touchableProps
    },
    ref
  ) => {
    let containerClass = '';
    let textClass = '';

    if (color === 'sucesso') {
      styleClass = { backgroundColor: '#23D365' };
      styleText = { color: '#09351A' };
    } else if (color === 'erro') {
      styleClass = { backgroundColor: '#ff0000' };
      styleText = { color: '#fff' };
    }

    switch (variant) {
      case ButtonType.Text:
        containerClass = ' bg-transparent ';
        textClass = ' text-primary ';
        color = color ? (textClass += ` text-${color} `) : '';
        break;

      case ButtonType.Outlined:
        containerClass = ' border border-primary bg-transparent ';
        textClass = ' text-primary ';
        break;

      case ButtonType.Filled:
      default:
        containerClass = ' bg-primary ' + (color ? ` bg-${color} ` : '');
        textClass = ' text-white ';
        break;
    }

    // aplica classe extra se estiver desabilitado
    if (touchableProps.disabled) {
      containerClass += ' opacity-50 ';
    }

    containerClass += className;
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`align-center items-center justify-center rounded-xl p-4 shadow-md ${containerClass}`}
        style={styleClass}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row items-center justify-center gap-4">
            {iconButton && (
              <Feather name={iconButton} size={16} color="white" className="font-bold" />
            )}
            <Text className={`text-center ${textClass + Typography.Titulo2}`} style={styleText}>
              {title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);
