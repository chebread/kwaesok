import Link from 'next/link';
import style from './not-found-page.module.scss';
import Image from '@data/kwaesok-favicon.png';

export default function NotFoundPage() {
  return (
    <div
      className={style.container}
      style={{
        backgroundImage: `url(${Image.src})`,
      }}
    >
      <header className={style.header}>
        <span>404 Not Found</span>
      </header>
      <main className={style.main}>
        <Link href="/" className={style.link}>
          <span>Return home</span>
        </Link>
      </main>
    </div>
  );
}
