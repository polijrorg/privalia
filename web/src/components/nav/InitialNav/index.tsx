import Link from "next/link";
import NavbarLogo from "../NavbarLogo";

function InitialNav() {
  return ( 
    <nav className="w-full py-6 px-8
    flex items-center justify-between">
      <div className="text-pink-500">
        <NavbarLogo isH2 />
      </div>

      <ul className="flex gap-4 text-xl">
        <li>
          <Link href="/escolas" className="font-medium" >Escolas</Link>
        </li>
        <li className="ml-8">
          <Link href='/login' className="button-md ">Entrar</Link>
        </li>
        <li>
          <Link href='/cadastro' className="button-md border-pink-200 text-pink-50 bg-pink-500">Cadastro</Link>
        </li>
      </ul>
    </nav>
   );
}

export default InitialNav;