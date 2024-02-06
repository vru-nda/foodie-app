import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main-header-background';
import logo from '@/assets/logo.png';

import classes from './main-header.module.css';

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link className={classes.logo} href={'/'}>
          <Image src={logo} alt='A plate with food on it' priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href={'/meals'}>Browse Meals</Link>
            </li>
            <li>
              <Link href={'/community'}>Foodie Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
