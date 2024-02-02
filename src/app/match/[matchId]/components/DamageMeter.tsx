import { cn } from '@/lib/utils';

export type DamageMeterProps = {
  damage: number;
  maxDamage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  backgroundClassName?: string;
};

export const DamageMeter = ({
  size = 'md',
  damage,
  maxDamage,
  className,
  backgroundClassName,
}: DamageMeterProps): JSX.Element => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center h-full', {
        'gap-2': size === 'lg',
        'gap-1.5': size === 'md',
        'gap-1': size === 'sm',
      })}
    >
      <div
        className={cn({
          'text-xs': size === 'sm',
          'text-md': size === 'md',
          'text-xl': size === 'lg',
          'font-semibold [text-shadow:_0_0_4px_white]': damage === maxDamage,
        })}
      >
        {damage.toLocaleString()}
      </div>
      <div
        className={cn(
          'relative rounded-full bg-blue-900',
          {
            'w-12 h-1': size === 'sm',
            'w-16 h-1.5': size === 'md',
            'w-24 h-2': size === 'lg',
          },
          backgroundClassName,
        )}
      >
        <div
          className={cn(
            'absolute top-0 left-0 rounded-full bg-blue-400',
            {
              'h-1': size === 'sm',
              'h-1.5': size === 'md',
              'h-2': size === 'lg',
            },
            className,
          )}
          style={{
            width: `${(damage * 100) / maxDamage}%`,
          }}
        />
      </div>
    </div>
  );
};
