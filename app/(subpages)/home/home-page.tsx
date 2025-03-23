'use client';

import { useEffect, useState } from 'react';
import style from './home-page.module.scss';
import TextEditor from '@components/text-editor';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

// 사용자가 입력을 마치면 (focus 중단) url에 data 저장

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAndShowAlert = () => {
      const firstAccessTime = localStorage.getItem('firstAccessTime');
      const alertShown = localStorage.getItem('alertShown');

      if (!firstAccessTime) {
        localStorage.setItem('firstAccessTime', Date.now().toString());
        return;
      }

      if (!alertShown && Date.now() - parseInt(firstAccessTime) >= 3000) {
        console.log('1분이 경과했습니다.'); // 작동 안함 시발

        setVisible(true);

        // nike rouneded btn 처럼, 개발자 페이지 이동하기 버튼 만들기 이 버튼은 꼭 개발자 페이지를 접속해야만 없어짐 즉, 클릭해야만 alertShown이 true가 됨 btn 클릭 안하면 alertShown이 false고 경과하면 계속 뜸
        // localStorage.setItem('alertShown', 'true');
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAndShowAlert();
      }
    };

    // 초기 실행
    const intervalId = (function () {
      checkAndShowAlert(); // 즉시 실행
      return setInterval(checkAndShowAlert, 1000); // 1초마다 실행
    })();

    // 가시성 변경 이벤트 리스너 등록
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId); // 인터벌 정리
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.buttonWrapper}>
        {/* <a
          className={style.buttonA}
          target="_blank"
          href="https://github.com/chebread"
        > */}
        <button
          className={clsx(style.button, {
            [style.visible]: visible,
          })}
          onClick={() => {
            setVisible(!visible);
            localStorage.setItem('alertShown', 'true'); // alert가 보였음(클릭됨)을 true로 설정. 다시는 btn이 표시 안됨

            router.push('https://github.com/chebread');

            // 경과후 부드럽게 뜨게 하기
          }}
        >
          개발자 페이지 바로가기
        </button>
        {/* </a> */}
      </div>
      <TextEditor className={style.input} />
    </div>
  );
}
