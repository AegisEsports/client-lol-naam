'use client';

import Link from 'next/link';
import { H1 } from '@/components/ui/H1';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CommandMenu } from '@/components/CommandMenu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { links } from '@/config/links';

export const NavBar = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        {/* todo: add mobile nav */}
        <Link href='/' className='mr-6'>
          <H1 className='transition duration-200'>Stats</H1>
        </Link>
        <nav className='flex items-center gap-4 text-sm lg:gap-6'>
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === href ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <CommandMenu />
          </div>
          <nav className='flex items-center'>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
