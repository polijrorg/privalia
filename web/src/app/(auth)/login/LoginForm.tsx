'use client'
import Link from "next/link";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";

import LoginOptionals from "@/components/auth/LoginOptionals";
import GoogleAuthButton from "@/components/auth/GoogleLoginButton";
import RequiredTag from "@/components/input/RequiredTag";
import ValidatedInput from "@/components/input/ValidatedInput";
import { loginAction } from "@/services/actions";

function LoginForm() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  return ( 
    <div className="lg:w-[90%] xl:w-[80%]">
      <h2 className="font-bold text-[40px] text-center leading-12">Continue seu aprendizado</h2>
      <form className="mt-6" action={loginAction}>
        <ValidatedInput 
          title="E-mail"
          placeholder="exemplo@noctiluz.com.br"
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          labelClassName='auth-label'
          inputClassName='auth-input'
          iconContainerClassName="auth-icon"
        ><RequiredTag/></ValidatedInput>
        
        <ValidatedInput 
          title="Senha"
          placeholder="Insira sua senha"
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          containerClassName="mt-4"
          labelClassName="auth-label"
          inputClassName="auth-input"
          iconContainerClassName="auth-icon"
        ><RequiredTag/></ValidatedInput>

        <LoginOptionals />

        <button type="submit" disabled={loading} className="login-button mt-6 text-pink-50 colorTransition bg-pink-500 hover:bg-pink-400"><Mail />Entrar</button>
      </form>
      
      <div className="flex items-center gap-4 py-5">
        <div className="flex-grow h-0.5 bg-gray-400" />
        <p className="text-gray-400 text-lg">ou</p>
        <div className="flex-grow h-0.5 bg-gray-400" />
      </div>

      <GoogleAuthButton disabled={loading} text="Entrar com Google" />

      <Link href='/cadastro' className="block w-fit mt-8 text-sm group">Ainda não tem uma conta? <span className="text-pink-500 colorTransition border-b border-transparent group-hover:border-pink-500">Cadastre-se</span></Link>
    </div>
   );
}

export default LoginForm;