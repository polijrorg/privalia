import Link from "next/link";
import Noctiluz from '@/components/svgs/noctiluz.svg'

function NavbarLogo() {
  return ( 
    <Link className="flex items-center gap-2" href="/">
      <Noctiluz className="w-10" />
      <h1 className="font-bold text-3xl">noctiluz</h1>
    </Link>
   );
}

export default NavbarLogo;