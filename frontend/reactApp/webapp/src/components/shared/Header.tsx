import React from 'react'
import ConnectWalletButton from './ConnectWalletButton'
import Image from 'next/image'

import efrnd from "../../../public/Images/efrnd.png";
import Link from 'next/link';

const Header = (): React.JSX.Element => {
  return (
    <header className='h-[10rem] w-full bg-slate-400 flex items-center justify-between px-5 overflow-hidden'>

      <div className='text-left'>

        <Link href={"/"}>

          <Image
            src={efrnd}
            alt='EFRND'
            width={75}
            height={75}

          />

        </Link>





      </div>

      <div className='flex items-center justify-center'>

        <ConnectWalletButton />

      </div>


    </header>
  )
}

export default Header