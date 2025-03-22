'use client';

import { useEffect, useRef, useState } from 'react';

export default function TextEditor({ className }: { className: any }) {
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
    <div
      ref={inputRef}
      className={className}
      contentEditable
      // onBlur={handleBlur}
      data-placeholder="아무 곳이나 클릭하여 메모를 시작하세요" // 새로고침 할 때 마다 변경됨 openai 404 page 같이
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
  );
}
