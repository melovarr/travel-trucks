'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(pathname === href);
  }, [pathname, href]);

  return (
    <Link
      href={href}
      className={`${styles.link} ${isActive ? styles.active : ''}`}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home">
        <Image
          src="/traveltrucks.svg"
          alt="TravelTrucks"
          width={136}
          height={15}
        />
      </Link>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/catalog">Catalog</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
