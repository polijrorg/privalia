import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

type ResponsiveLayoutProps = {
  header?: React.ReactNode; // título / cabeçalho (full width sempre)
  footer?: React.ReactNode; // rodape /  (full width sempre)
  left: React.ReactNode; // conteúdo principal
  right?: React.ReactNode; // conteúdo secundário
  splitScroll?: boolean; // se true, cada coluna rola separadamente
  leftFlex?: number; // proporção da esquerda (default 0.7)
  rightFlex?: number; // proporção da direita (default 0.3)
  style?: object; // estilos extras
};

export default function ResponsiveLayout({
  header,
  footer,
  left,
  right,
  splitScroll = false,
  leftFlex = 0.5,
  rightFlex = 0.5,
  style,
}: ResponsiveLayoutProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const css = 'bg-backgroundPattern p-6 pt-10 pb-40';
  const cssHeader = 'mb-5 w-full';
  const cssFooter = 'mt-5 w-full';

  // Caso não tenha "right", só renderiza uma coluna
  if (!right) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} className={css}>
        <View style={[{ flex: 1 }, style]}>
          <View className={cssHeader}>{header}</View>
          <View style={{ flex: 1 }}>{left}</View>
          <View className={cssFooter}>{footer}</View>
        </View>
      </ScrollView>
    );
  }

  // Layout em paisagem
  if (isLandscape) {
    if (splitScroll) {
      // Cada coluna com seu scroll
      return (
        <View style={{ flex: 1, paddingBottom: 120 }} className={css}>
          <View className={cssHeader}>{header}</View>
          <View style={{ gap: 20, flexDirection: 'row' }}>
            <ScrollView style={{ flex: leftFlex }}>{left}</ScrollView>
            <ScrollView style={{ flex: rightFlex }}>{right}</ScrollView>
          </View>
          <View className={cssFooter}>{footer}</View>
        </View>
      );
    } else {
      // Scroll único
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} className={css}>
          <View style={{ flex: 1 }}>
            <View className={cssHeader}>{header}</View>
            <View style={{ gap: 20, flexDirection: 'row' }}>
              <View style={{ flex: leftFlex }}>{left}</View>
              <View style={{ flex: rightFlex }}>{right}</View>
            </View>
            <View className={cssFooter}>{footer}</View>
          </View>
        </ScrollView>
      );
    }
  }

  // Layout em retrato → empilha
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} className={css}>
      <View className={cssHeader}>{header}</View>
      <View style={{ flexDirection: 'column', gap: 10 }}>
        <View className="w-full">{left}</View>
        <View className="w-full">{right}</View>
      </View>
      <View className={cssFooter}>{footer}</View>
    </ScrollView>
  );
}
