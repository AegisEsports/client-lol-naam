import Image from 'next/image';

import Arrow from '@/../public/svg/scoreboard-stat-switcher-arrow.svg';
import CC from '@/../public/svg/scoreboard-stat-switcher-cc-score.svg';
import Damage from '@/../public/svg/scoreboard-sword-icon.svg';
import DamageTaken from '@/../public/svg/scoreboard-stat-switcher-shield.svg';
import Minions from '@/../public/svg/scoreboard-stat-switcher-minions-slain.svg';
import Vision from '@/../public/svg/scoreboard-stat-switcher-eye.svg';
import KDA from '@/../public/svg/scoreboard-kda-icon.svg';

import { cn } from '@/lib/utils';

export type ScoreboardIconProps = {
  size?: 'sm' | 'md' | 'lg';
  type:
    | 'leftarrow'
    | 'kda'
    | 'sword'
    | 'shield'
    | 'cc'
    | 'minions'
    | 'eye'
    | 'gold'
    | 'rightarrow';
};

export const ScoreboardIcon = ({
  size = 'md',
  type,
}: ScoreboardIconProps): JSX.Element => {
  const iconSize = 32;

  const className = cn({
    'w-3 h-3': size === 'sm',
    'w-[1.125rem] h-[1.125rem]': size === 'md',
    'w-6 h-6': size === 'lg',
  });

  if (type === 'gold') {
    return (
      <div className={className}>
        <Image
          src='/images/mask-icon-gold.png'
          width={iconSize}
          height={iconSize}
          alt={type}
        />
      </div>
    );
  }

  if (type === 'leftarrow') {
    return <Arrow className={className} />;
  }

  if (type === 'rightarrow') {
    return <Arrow className={cn(className, 'rotate-180')} />;
  }

  if (type === 'kda') {
    return <KDA className={className} />;
  }

  if (type === 'sword') {
    return <Damage className={className} />;
  }

  if (type === 'shield') {
    return <DamageTaken className={className} />;
  }

  if (type === 'cc') {
    return <CC className={className} />;
  }

  if (type === 'minions') {
    return <Minions className={className} />;
  }

  if (type === 'eye') {
    return <Vision className={className} />;
  }

  return <></>;
};
