import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { type Participants } from '@/lib/match';
import { cn } from '@/lib/utils';

/** Props for {@link PlayerSelector}. */
export type PlayerSelectorProps = {
  /** A list of players from the match and associated metadata. */
  players: Participants;
  /** The currently selected participant ids. */
  selected: number[];
  /** If applicable, the currently hovered participant id. */
  hovered: number | undefined;
  /** Passes the participant id being hovered. */
  onHover: (id: number | undefined) => void;
  /** Passes a participant id on selection or deselection. */
  onSelect: (id: number) => void;
};

/**
 * Displays a strip of champion icons, with callbacks for selection and
 * hovering.
 */
export const PlayerSelector = ({
  players,
  selected,
  hovered,
  onHover,
  onSelect,
}: PlayerSelectorProps): JSX.Element => {
  return (
    <div className='flex gap-2'>
      {Object.values(players).map((player) => {
        const isSelected =
          selected.length === 0 || selected.includes(player.participantId);
        const isHovered = hovered === player.participantId;
        const isNotHovered =
          hovered !== undefined && hovered !== player.participantId;
        console.log(
          player.displayName,
          isSelected,
          hovered,
          player.participantId,
          isNotHovered,
        );
        return (
          <div
            onMouseEnter={() => {
              onHover(player.participantId);
            }}
            onMouseLeave={() => {
              onHover(undefined);
            }}
            onClick={() => {
              onSelect(player.participantId);
            }}
            className={cn('relative transition', {
              grayscale: !isSelected && !isHovered,
            })}
          >
            <ChampIcon size='md' champId={player.championId} />
            <div
              className={cn(
                isSelected && isNotHovered ? 'opacity-100' : 'opacity-0',
                'absolute top-0 bottom-0 left-0 right-0 bg-white/50 rounded-lg transition',
              )}
            />

            <div
              className={cn(
                !isSelected && !isHovered ? 'opacity-100' : 'opacity-0',
                'absolute top-0 bottom-0 left-0 right-0 bg-gray-500/50 rounded-lg transition',
              )}
            />
          </div>
        );
      })}
    </div>
  );
};
