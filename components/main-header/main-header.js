import Image from 'next/image';
import Link from 'next/link';

import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

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
              <NavLink href={'/meals'}>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href={'/community'}>Foodie Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
