import { H1 } from '@/components/H1';
import Link from 'next/link';

export default function HomePage(): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center grow gap-2'>
      <H1>Welcome to Stats.</H1>
      <Link href='/match/4421881781/'>
        <button className='btn btn-primary'>Go to match history test</button>
      </Link>
    </div>
  );
}
