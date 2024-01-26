import Image from 'next/image';

const ROLE_PATH =
  'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/';

export type RoleProps = {
  role: Riot.MatchV5.Role;
  size?: 'sm' | 'md' | 'lg';
};

export const Role = ({ role, size }: RoleProps): JSX.Element => {
  const sizePx = size === 'sm' ? 24 : 48;

  return (
    <Image
      src={`${ROLE_PATH}position-${role.toLowerCase()}.svg`}
      height={sizePx}
      width={sizePx}
      alt={role}
    />
  );
};
