'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export type ViewOption = (typeof viewOptions)[number];
export const viewOptions = [
  'Team Gold Advantage',
  'Team Gold',
  'Champion Gold',
] as const;

export type ViewSelectorProps = {
  view: ViewOption;
  onSelectView: (view: ViewOption) => void;
};

export const ViewSelector = ({
  view,
  onSelectView,
}: ViewSelectorProps): JSX.Element => (
  <Select value={view} onValueChange={onSelectView}>
    <SelectTrigger className='w-52'>
      <SelectValue placeholder='Theme' />
    </SelectTrigger>
    <SelectContent>
      {viewOptions.map((option) => {
        return (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        );
      })}
    </SelectContent>
  </Select>
);
