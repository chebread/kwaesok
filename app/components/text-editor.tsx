'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function TextEditor({ className }: { className: any }) {
  const inputRef: any = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const saveDataToUrl = (key: string, value: string) => {
    // value must be encoded

    router.push(pathname + '?data=' + value);
  };

  const loadDataFromUrl = (key: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get(key);

    return data ? decodeURIComponent(data) : '';
  };

  const handleBlur = () => {
    if (inputRef.current && !inputRef.current.textContent.trim()) {
      inputRef.current.textContent = '';
    }
  };

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

    const encodedText = encodeURIComponent(text);

    console.log(loadDataFromUrl('data'));

    router.push(
      pathname +
        '?data=' +
        encodeURIComponent(loadDataFromUrl('data')) +
        encodedText
    );
  };

  // useEffect(() => {
  //   const handleInput = () => {
  //     if (inputRef.current) {
  //       console.log('x');

  //       setContent(inputRef.current.textContent || '');
  //     }
  //   };

  //   const element = inputRef.current;
  //   if (element) {
  //     element.addEventListener('input', handleInput);
  //   }

  //   return () => {
  //     if (element) {
  //       element.removeEventListener('input', handleInput);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const savedData = loadDataFromUrl('data');
    if (savedData) {
      setContent(savedData);
      if (inputRef.current) {
        inputRef.current.textContent = savedData;
      }
    }
  }, []);

  return (
    <div
      ref={inputRef}
      className={className}
      contentEditable
      // onBlur={handleBlur}
      data-placeholder="아무 곳이나 클릭하여 메모를 시작하세요" // 새로고침 할 때 마다 변경됨 openai 404 page 같이
      onInput={(event: any) => {
        const text = event.target.innerText.replace(/\n\n/g, '\n');
        setContent(text);

        // 텍스트가 실제로 비어있는지 확인 (공백, 줄바꿈만 있는 경우도 고려)
        if (!text.trim()) {
          // 빈 경우 쿼리스트링 없이 페이지로 이동
          router.push(pathname);

          handleBlur();
        } else {
          const encodedText = encodeURIComponent(text);
          saveDataToUrl('data', encodedText);
        }
      }}
      onKeyDown={(event: any) => {
        if (event.keyCode === 9) {
          // Tab
          event.preventDefault();
        }
        if (event.keyCode === 13) {
          // New Line
        }
      }}
      onPaste={handlePasteWithSelectionApi}
    ></div>
  );
}
