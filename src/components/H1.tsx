import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type H1Props = {
  className?: string;
  children: ReactNode;
};

export const H1 = ({ children, className }: H1Props) => {
  return <h1 className={cn(className, 'text-3xl font-bold')}>{children}</h1>;
};
