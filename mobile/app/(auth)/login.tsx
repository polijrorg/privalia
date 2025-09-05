import { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '~/contexts/AuthContext';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { isValidEmail, isValidPassword } from '~/Utils/ValidaCampos';

import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonType } from '~/types/ButtonTypes';
import { Typography } from '~/Utils/Tipografia';

export default function LoginScreen() {
  const { setUser, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState('analista@privalia.com');
  const [password, setPassword] = useState('analista1234');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = () => {
    router.push('/cadastro');
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Atenção!', 'Insira um email válido.');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Atenção!', 'Insira uma senha com no mínimo 6 caracteres.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // ⚠️ Mocka o usuário manualmente
      setUser({
        id: '1',
        name: 'Usuário Teste',
        email,
      });

      // Navega para a tela principal
      router.push('/');

      setIsLoading(false);
    }, 10);

    /*
    const result = await signIn(email, password);
    console.log(result);

    if (!result.success) {
      Alert.alert('Falha no login', result.error || 'Ocorreu um erro, tente novamente mais tarde.');
    }
    // If successful, the AuthProvider will handle navigation
    
    setIsLoading(false);
    */
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
    <LinearGradient
      colors={['#0a0a0f', '#26262e']} // from-background to-muted
      start={[0, 0]}
      end={[1, 1]}
      className="flex-1 items-center justify-center">
      <View className="w-1/2  rounded-xl bg-backgroundPattern p-6 ">
        <View className="items-center justify-center ">
          <View className="h-20 w-20 items-center justify-center rounded-xl bg-primary">
            <Text className="text-xl font-bold text-white">P</Text>
          </View>
        </View>
        <Text className={Typography.Titulo1 + 'text-center'}>Auditoria Logística</Text>
        <Text className={Typography.Subtitulo1 + 'mb-5 text-center'}>Privalia</Text>

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

        <Button
          onPress={handleCadastro}
          title="Solicitar cadastro"
          variant={ButtonType.Text}
          color="secondary"
        />

        <View className="flex-row justify-center text-secondary">
          <Text className={Typography.Subtitulo3}>Versão 1.0 • Ambiente de Produção </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
