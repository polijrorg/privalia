'use client'
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { isSafeRedirect } from "@/utils";
import { signIn } from "next-auth/react";

import { HTMLMotionProps } from "motion/react";
import BaseMotionButton from "../common/BaseMotionButton";

type GoogleAuthButtonProps = HTMLMotionProps<"button"> & {
  className?: string;
  text?: string;
};

function GoogleAuthButton({ className, text, ...props }: GoogleAuthButtonProps) {
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

        <BaseMotionButton type="submit" className='login-button tracking-4' {...props}>
            <Image
              src={`/icons/google-logo.png`}
              alt={`Google logo`}
              width={24}
              height={24}
            />

          {text}
        </BaseMotionButton>
      </form>
    );
}

export default GoogleAuthButton;