import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type CardProps = {
  color?: string;
  className?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card(props: CardProps) {
  return (
    <View
      style={props.style}
      className={
        'rounded-lg border border-borderPattern p-6 shadow-sm ' +
        (props.color ? ` bg-${props.color} ` : ' bg-foregroundPattern ') +
        props.className
      }>
      {props.children}
    </View>
  );
}
