import { ReactNode } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

type CardProps = {
  title?: string;
  value?: string;
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
      {props.children ? (
        props.children
      ) : (
        <>
          <Text className="text-1xl font-bold text-secondary">{props.title}</Text>
          <Text
            className={`text-2xl font-bold ${props.color ? `text-${props.color}` : 'text-white'}`}>
            {props.value}
          </Text>
        </>
      )}
    </View>
  );
}
