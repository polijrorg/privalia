import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonType } from '~/types/ButtonTypes';
import { useRouter } from 'expo-router';
import { isValidEmail, isValidPassword } from '~/Utils/ValidaCampos';
import { Typography } from '~/Utils/Tipografia';

export default function CadastroScreen() {
  const [email, setEmail] = useState('analista@privalia.com');
  const [password, setPassword] = useState('analista1234');
  const [repassword, setRepassword] = useState('analista1234');

  const router = useRouter();

  const handleCadastro = () => {
    if (!isValidEmail(email)) {
      Alert.alert('Atenção!', 'Insira um email válido.');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Atenção!', 'Insira uma senha com no mínimo 6 caracteres.');
      return;
    }

    if (password !== repassword) {
      Alert.alert('Atenção!', 'A senha e a confirmação devem ser iguais.');
      return;
    }

    // Mostra mensagem que a conta ainda não foi ativada
    Alert.alert('Atenção', 'Sua conta está sendo validada com o administrador do sistema.');

    // Navega para a tela de login
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <LinearGradient
      colors={['#0a0a0f', '#26262e']} // from-background to-muted
      start={[0, 0]}
      end={[1, 1]}
      className="flex-1 items-center justify-center">
      <View className="w-1/2  rounded-xl bg-backgroundPattern p-6 ">
        <Text className={Typography.Titulo1 + ' text-center'}>Criar conta</Text>
        <Text className={Typography.Subtitulo2 + ' mb-5 text-center'}>
          Preencha os dados para criar sua conta
        </Text>

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

        <Input
          label="Confirmar Senha"
          placeholder="••••••••"
          value={repassword}
          secureTextEntry
          onChangeText={setRepassword}></Input>

        <Button title="Criar conta" onPress={handleCadastro} className="mb-4" />

        <Button
          title="Já tem conta? fazer login"
          onPress={handleLogin}
          variant={ButtonType.Text}
          color="secondary"
        />

        <View className="flex-row justify-center text-secondary">
          <Text className={Typography.Subtitulo3}>Privalia • v1.0.0</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
