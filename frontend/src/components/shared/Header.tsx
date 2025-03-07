import React from 'react'
import ConnectWalletButton from './ConnectWalletButton'
import Image from 'next/image'

import sfrnd from "../../../public/images/sfrnd.png";
import Link from 'next/link';

const Header = (): React.JSX.Element => {
  return (
    <header className='h-[10rem] w-full bg-slate-400 flex items-center justify-between px-5 overflow-hidden'>

      <div className='text-left'>

        <Link href={"/"}>

          <Image
            src={sfrnd}
            alt='SFRND'
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