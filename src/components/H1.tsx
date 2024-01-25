import { ReactNode } from 'react';

export type H1Props = {
  children: ReactNode;
};

export const H1 = ({ children }: { children: ReactNode }) => {
  return <h1 className='text-3xl font-bold'>{children}</h1>;
};
