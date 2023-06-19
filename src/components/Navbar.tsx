import Image from 'next/image';
import Logo from '../assets/img/logo.png'
import { MenuLinks } from './MenuLinks';

export function Navbar() {
  return (
    <nav className={`
      flex justify-between py-4 px-6
      text-[#16479d]
      bg-[#ffd400]
    `}>
      <div className={`
        flex items-center
      `}>
        <Image src={Logo} alt='Logo Get A Pet' className='w-[40px] mr-3'/>
        <h2 className='text-2xl bold'>Get A Pet</h2>
      </div>
      <MenuLinks />
    </nav>
  )
}