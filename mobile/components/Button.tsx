import { forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from 'react-native';
import { ButtonType } from '~/types/ButtonTypes';

type ButtonProps = {
  title: string;
  variant?: ButtonType;
  isLoading?: boolean;
  className?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  (
    { title, variant = ButtonType.Filled, isLoading = false, className, ...touchableProps },
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
        className={`items-center rounded-xl p-4 shadow-md ${containerClass}`}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className={`text-center text-lg font-semibold ${textClass}`}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
