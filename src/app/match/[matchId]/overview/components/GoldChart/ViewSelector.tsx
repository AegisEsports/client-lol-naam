'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

/** A chart type to show. */
export type ViewOption = (typeof viewOptions)[number];

/** A list of chart types. */
export const viewOptions = [
  'Team Gold Advantage',
  'Team Gold',
  'Champion Gold',
] as const;

/** Props for {@link ViewSelector}. */
export type ViewSelectorProps = {
  /** The currently selected chart type. */
  view: ViewOption;
  /** Passes a newly selected chart type. */
  onSelectView: (view: ViewOption) => void;
};

/** A dropdown menu configured to select a chart type. */
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
