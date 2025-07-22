import { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '~/contexts/AuthContext';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';

export default function LoginScreen() {
  const { signIn, signInWithGoogle, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção!', 'Preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    const result = await signIn(email, password);
    console.log(result);

    if (!result.success) {
      Alert.alert('Falha no login', result.error || 'Ocorreu um erro, tente novamente mais tarde.');
    }
    // If successful, the AuthProvider will handle navigation

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center p-6">
      <View className="items-center justify-center ">
        <View className="h-20 w-20 items-center justify-center rounded-xl bg-primary">
          <Text className="text-xl font-bold text-white">P</Text>
        </View>
      </View>
      <Text className="mt-5 text-center text-2xl font-bold">Auditoria Logística</Text>
      <Text className="text-1xl mt-5 text-center font-bold">Privalia</Text>

      <Input
        label="Email"
        placeholder="analista@privalia.com"
        value={email}
        onChangeText={setEmail}></Input>

      <Input
        label="Senha"
        placeholder="••••••••"
        value={password}
        secureTextEntry
        onChangeText={setPassword}></Input>

      <Button
        onPress={handleLogin}
        disabled={isLoading}
        title="Entrar"
        className="mb-4"
        isLoading={isLoading}></Button>

      <View className="flex-row justify-center">
        <Text>Versão 1.0 • Ambiente de Produção </Text>
      </View>
    </View>
  );
}
