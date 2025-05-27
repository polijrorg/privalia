'use client'
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { isSafeRedirect } from "@/utils";
import { signIn } from "next-auth/react";

function GoogleLoginButton({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? "/";
  const safeCallbackUrl = isSafeRedirect(callbackUrl) ? callbackUrl : "/";
  
  return ( 
      <form
        className={clsx("w-full flex-1", className)}
        action={() => {
          return signIn("google", { callbackUrl: safeCallbackUrl })
        }}
      >
        <input type="hidden" name="type" value="google" />

        <button type="submit" className='login-button tracking-4'>
            <Image
              src={`/icons/google-logo.png`}
              alt={`Google logo`}
              width={24}
              height={24}
            />

          Entrar com Google
        </button>
      </form>
    );
}

export default GoogleLoginButton;