'use client';

import { useEffect, useRef } from 'react';
import style from './home-page.module.scss';
import { useState } from 'react';

import clsx from 'clsx';

export default function HomePage() {
  console.log(1);

  const inputRef: any = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const handleInput = () => {
      if (inputRef.current) {
        setContent(inputRef.current.textContent || '');
      }
    };

    const element = inputRef.current;
    if (element) {
      element.addEventListener('input', handleInput);
    }

    return () => {
      if (element) {
        element.removeEventListener('input', handleInput);
      }
    };
  }, []);

  const handleBlur = () => {
    if (inputRef.current && !inputRef.current.textContent.trim()) {
      inputRef.current.textContent = '';
    }
  };

  // useEffect(() => {
  //   const handlePaste = (e: ClipboardEvent) => {
  //     e.preventDefault();
  //     const text = e.clipboardData?.getData('text/plain') || '';
  //     document.execCommand('insertText', false, text);
  //   };

  //   const editableDiv = inputRef.current;
  //   if (editableDiv) {
  //     editableDiv.addEventListener('paste', handlePaste);
  //   }

  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     if (editableDiv) {
  //       editableDiv.removeEventListener('paste', handlePaste);
  //     }
  //   };
  // }, []);

  // console.log('>>> ' + content + ' <<<');

  // console.log(content.replace(/\n/g, '<br />'));

  const handlePasteWithSelectionApi = async (
    e: React.ClipboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');

    // 현재 선택 영역 가져오기
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();

      // 텍스트 노드 생성 및 삽입
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // 커서 위치 조정
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div
          ref={inputRef}
          className={clsx(style.input)}
          contentEditable
          // onBlur={handleBlur}
          data-placeholder="아무 곳이나 클릭하여 메모하세요" // 새로고침 할 때 마다 변경됨 openai 404 page 같이
          onInput={(event: any) => {
            const text = event.target.innerText.replace(/\n\n/g, '\n');
            setContent(text);
            console.log('>' + content + '<');

            if (content === '') {
              handleBlur(); // placeholder 다시 보이기
            }
          }}
          onKeyDown={(event: any) => {
            if (event.keyCode === 9) {
              // Tab
              event.preventDefault();
            }
            if (event.keyCode === 13) {
              // New Line
              // event.preventDefault();
            }
          }}
          onPaste={handlePasteWithSelectionApi}
        ></div>
      </div>
    </div>
  );
}

/*
기본 컨테이너 구조는 서버에서 렌더링됨

인터랙티브 부분만 클라이언트 컴포넌트로 분리됨

초기 로드 시 기본 레이아웃이 바로 표시됨

하이드레이션 후 인터랙티브 기능이 활성화됨
*/
