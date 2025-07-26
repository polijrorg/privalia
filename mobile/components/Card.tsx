import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type CardProps = {
  title?: string;
  value?: string;
  color?: string;
  className?: string;
  children?: ReactNode; // <- permite conteúdo personalizado
};

export default function Card(props: CardProps) {
  return (
  <View className={"bg-foregroundPattern border-borderPattern rounded-lg border p-6 shadow-sm " + props.className}>
      {props.children ? (
        props.children
      ) : (
        <>
          <Text className="text-secondary text-1xl font-bold">{props.title}</Text>
          <Text className={`text-2xl font-bold ${props.color ? `text-${props.color}` : 'text-white'}`}>
            {props.value}
          </Text>
        </>
      )}
    </View>
  );
}
