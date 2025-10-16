// import Image from 'next/image';
import styles from './Hero.module.css';

// import Button from '../components/UI/Buttons/Button';
import Link from 'next/dist/client/link';

// const handleClick = () => {
//   console.log('Button clicked!');
// };

export default function HomePage() {
  return (
    <section className={styles.background}>
      <h1 className={styles.heroTitle}>Campers of your dreams</h1>
      <p className={styles.heroItem}>
        You can find everything you want in our catalog
      </p>
      <Link href="/catalog" aria-label="Catalog" className={styles.btn}>
        View Now
      </Link>
    </section>
  );
}
