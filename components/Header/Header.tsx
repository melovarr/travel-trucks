import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        TravelTrucks
      </Link>
      <nav>
        <ul className={css.navigation}>
          <li>
            <Link href="/" aria-label="Home">
              Home
            </Link>
          </li>
          <li>
            <Link href="/catalog" aria-label="Catalog">
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
