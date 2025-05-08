// app/booking/confirm/page.tsx
import { Suspense } from 'react';
import ConfirmContent from '@/app/components/ConfirmContent';

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={<div>Loading confirmation...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
