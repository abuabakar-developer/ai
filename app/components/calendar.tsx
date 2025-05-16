'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function Calendar({ selected, onSelect, month }: any) {
  return (
    <div className="w-full overflow-x-auto">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        month={month}
        captionLayout="dropdown"
        fixedWeeks
        showOutsideDays
        className="!w-full"
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-center',
          month: 'space-y-4',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium text-gray-900',
          nav: 'flex items-center',
          nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell: 'text-gray-500 rounded-md w-9 h-9 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2',
          cell: 'text-center text-sm p-1 relative [&:has([aria-selected])]:bg-blue-100',
          day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-blue-200',
          day_today: 'bg-blue-50 border border-blue-500',
        }}
      />
    </div>
  );
}
