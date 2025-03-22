'use client';

import { useEffect } from 'react';
import style from './home-page.module.scss';
import TextEditor from '@components/text-editor';

export default function HomePage() {
  useEffect(() => {
    // 페이지 가시성 변경 핸들러
    const handleVisibilityChange = () => {
      const now = Date.now();

      if (document.hidden) {
        // 페이지 숨김 시 현재까지 누적 시간 저장
        const startTime = parseInt(
          localStorage.getItem('pageStartTime') || '0'
        );
        if (startTime > 0) {
          const currentElapsed = parseInt(
            localStorage.getItem('pageElapsedTime') || '0'
          );
          const newElapsed = currentElapsed + (now - startTime);
          localStorage.setItem('pageElapsedTime', newElapsed.toString());
          localStorage.removeItem('pageStartTime');
        }
      } else {
        // 페이지 다시 보임 시 시작 시간 기록
        localStorage.setItem('pageStartTime', now.toString());
      }
    };

    // 타이머 체크 함수
    const checkTimer = () => {
      const now = Date.now();
      const startTime = parseInt(localStorage.getItem('pageStartTime') || '0');
      const elapsedTime = parseInt(
        localStorage.getItem('pageElapsedTime') || '0'
      );

      // 현재 보고 있는 시간 + 이전에 누적된 시간
      const totalTime = (startTime > 0 ? now - startTime : 0) + elapsedTime;

      if (totalTime >= 60000) {
        // 1분 경과
        alert('1분이 경과했습니다.');
        // 타이머 초기화
        localStorage.setItem('pageElapsedTime', '0');
        localStorage.setItem('pageStartTime', now.toString());
      }
    };

    // 초기 설정
    if (!document.hidden) {
      localStorage.setItem('pageStartTime', Date.now().toString());
      if (!localStorage.getItem('pageElapsedTime')) {
        localStorage.setItem('pageElapsedTime', '0');
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 주기적으로 타이머 체크
    const intervalId = setInterval(checkTimer, 1000);

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // 언마운트 시 현재까지 누적 시간 저장
      if (!document.hidden) {
        const startTime = parseInt(
          localStorage.getItem('pageStartTime') || '0'
        );
        if (startTime > 0) {
          const currentElapsed = parseInt(
            localStorage.getItem('pageElapsedTime') || '0'
          );
          const newElapsed = currentElapsed + (Date.now() - startTime);
          localStorage.setItem('pageElapsedTime', newElapsed.toString());
        }
      }
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <TextEditor className={style.input} />
      </div>
    </div>
  );
}
