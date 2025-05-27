'use client'
import Noctiluz from '@/svgs/noctiluz.svg'
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

function LoginPage() {
  return ( 
    <main className="lg:h-screen flex">
      <div className="w-[55%] h-full flex flex-col gap-8 items-center justify-center">
        <div className="lg:w-[90%] xl:w-[80%]">
          <h2 className="font-bold text-[40px] text-center leading-12">Continue seu aprendizado</h2>
          <form action="">
          </form>
          
          <div className="flex items-center gap-4 py-5">
            <div className="flex-grow h-0.5 bg-gray-300" />
            <p className="text-gray-400 text-lg">ou</p>
            <div className="flex-grow h-0.5 bg-gray-300" />
          </div>
          <GoogleLoginButton />
        </div>
      </div>

      <div className="login-background h-full w-[45%] flex flex-col items-center py-32">
        <div className="text-pink-500 flex gap-4">
          <Noctiluz className="" />
          <h1 className='font-bold text-[64px]'>noctiluz</h1>
        </div>
      </div>
    </main>
   );
}

export default LoginPage;