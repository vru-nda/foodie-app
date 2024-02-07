'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import classes from './main-header.module.css';

const NavLink = ({href, children}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={
        pathname.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
