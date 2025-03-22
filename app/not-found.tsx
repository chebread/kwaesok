import NotFoundPage from '@(subpages)/not-found/not-found-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  description: '페이지를 찾을 수 없습니다.',
};

export default function NotFound() {
  return <NotFoundPage></NotFoundPage>;
}
