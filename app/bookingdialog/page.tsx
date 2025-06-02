'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '../components/calendar';
import { format } from 'date-fns';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState({
    pakistanTime: '',
    maldivesTime: '',
  });
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const pakistan = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
      const maldives = new Date().toLocaleString('en-US', { timeZone: 'Indian/Maldives' });

      setCurrentTime({
        pakistanTime: format(new Date(pakistan), 'h:mm a'),
        maldivesTime: format(new Date(maldives), 'h:mm a'),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const dateWithTime = new Date(selectedDate);
      dateWithTime.setHours(hours, minutes, 0, 0);
      router.push(`/bookingdialog/confirm?date=${dateWithTime.toISOString()}`);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date();
    start.setHours(10, 0, 0, 0);
    const end = new Date();
    end.setHours(18, 0, 0, 0);

    while (start < end) {
      slots.push(format(new Date(start), 'HH:mm'));
      start.setMinutes(start.getMinutes() + 30);
    }

    return slots;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center font-sans justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-900 font-semibold">Preparing your booking experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br font-sans from-white via-slate-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row shadow-2xl border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-br from-blue-800 via-blue-950 to-blue-900 text-white p-6 sm:p-8 lg:w-1/2">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-6xl">💬</span>
              <div>
                <h2 className="text-4xl font-bold">Talksy</h2>
                <p className="text-white/80">30 Minute Meeting · 30 min</p>
              </div>
            </div>
            <div className="border-t border-white/40 my-6" />
            <p className="text-white/70 mb-6">Web conferencing details will be shared upon confirmation.</p>
            <h3 className="text-2xl font-semibold mb-2">Select a Date & Time</h3>
            <p className="text-white/90 text-base">Choose a suitable time for your chatbot AI meeting.</p>
            <div className="mt-10 text-sm text-white/70">
              <p>Current Times:</p>
              <p className="font-medium mt-1">
                Pakistan: {currentTime.pakistanTime} | Maldives: {currentTime.maldivesTime}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-white lg:w-1/2 w-full">
            {!selectedDate ? (
              <>
                <h3 className="text-3xl font-semibold text-gray-800 mb-6">Pick a Day</h3>
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={new Date(2025, 3)}
                />
              </>
            ) : (
              <div className="flex flex-col h-full">
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-sm text-blue-600 underline mb-4 self-start"
                >
                  ← Change date
                </button>
                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                  Available Time Slots on {format(selectedDate, 'eeee, MMMM d, yyyy')}
                </h4>
                <div className="h-[400px] overflow-y-auto space-y-2 pr-2">
                  {generateTimeSlots().map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="w-full py-2 px-4 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-blue-100 transition"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
