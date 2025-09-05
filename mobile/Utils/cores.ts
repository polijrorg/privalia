import { StyleProp, TextStyle, ViewStyle } from 'react-native';

// Ao adicionar cores novas, certifique-se de adicionar também no arquivo tailwind.config.js
// Não esqueça de adicionar o Bg e o TextColor também

export const cores = {
  primary: '#9372DA',
  primaryDark: '#9372DA1A',
  secondary: '#808A95',
  backgroundPattern: '#141414',
  backgroundPattern2: '#262626',
  foregroundPattern: '#1A1A1A',
  borderPattern: '#2B2B2B',
  sucesso: '#23D365',
  erro: '#ff0000',
  alerta: '#995910',
};

export const bg: Record<string, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: cores.primary },
  primaryDark: { backgroundColor: cores.primaryDark },
  secondary: { backgroundColor: cores.secondary },
  backgroundPattern: { backgroundColor: cores.backgroundPattern },
  backgroundPattern2: { backgroundColor: cores.backgroundPattern2 },
  foregroundPattern: { backgroundColor: cores.foregroundPattern },
  borderPattern: { backgroundColor: cores.borderPattern },
  sucesso: { backgroundColor: cores.sucesso },
  erro: { backgroundColor: cores.erro },
  alerta: { backgroundColor: cores.alerta },
};

export const text: Record<string, StyleProp<TextStyle>> = {
  primary: { color: cores.primary },
  primaryDark: { color: cores.primaryDark },
  secondary: { color: cores.secondary },
  backgroundPattern: { color: cores.backgroundPattern },
  backgroundPattern2: { color: cores.backgroundPattern2 },
  foregroundPattern: { color: cores.foregroundPattern },
  borderPattern: { color: cores.borderPattern },
  sucesso: { color: cores.sucesso },
  erro: { color: cores.erro },
  alerta: { color: cores.alerta },
};
