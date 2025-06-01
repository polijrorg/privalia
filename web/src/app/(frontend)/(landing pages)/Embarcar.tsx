'use client'
import Link from "next/link";
import { motion } from 'motion/react'

function Embarcar() {
  return ( 
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} 
      className="mx-auto text-center w-fit"
    >
      <Link href='/cadastro' className="text-pink-50 text-4xl button-lg border-pink-200 bg-pink-500 colorTransition hover:bg-pink-400">Embarque agora</Link>
    </motion.div>
   );
}

export default Embarcar;