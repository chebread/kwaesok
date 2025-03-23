'use client';

import style from './home-page.module.scss';
import TextEditor from '@components/text-editor';

export default function HomePage() {
  return (
    <div className={style.container}>
      <TextEditor />
    </div>
  );
}
