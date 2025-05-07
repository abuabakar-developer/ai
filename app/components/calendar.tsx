'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function Calendar({ selected, onSelect, month }: any) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      month={month}
      captionLayout="dropdown"
      fixedWeeks
      showOutsideDays
      className="border rounded-lg p-4 sm:p-6 md:p-8 space-y-4 w-full"
    />
  );
}
