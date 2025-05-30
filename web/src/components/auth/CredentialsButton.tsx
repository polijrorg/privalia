import { mergeClasses } from "@/utils";
import { Mail } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function CredentialsButton({ children, className, ...props }: BaseButtonProps & { children: ReactNode, className?: string }) {
  return ( 
    <button type="submit" className={mergeClasses("login-button text-pink-50 colorTransition bg-pink-500 hover:bg-pink-400", className)} {...props}>
      <Mail />
      {children}
    </button>
   );
}

export default CredentialsButton;