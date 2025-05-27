import { Suspense } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return ( 
    <Suspense fallback={<div>Carregando...</div>}>
      {children}
    </Suspense>
   );
}

export default AuthLayout;