import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import CalendarDay from '../components/calendar/CalendarDay';
import CalendarHeader from '../components/calendar/CalendarHeader';
import EventModal from '../components/calendar/EventModal';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock events data
  const events = [
    { id: 1, title: 'Team Meeting', date: '2025-03-15', startTime: '10:00', endTime: '11:00', category: 'Work' },
    { id: 2, title: 'Project Deadline', date: '2025-03-18', startTime: '23:59', endTime: '23:59', category: 'Work' },
    { id: 3, title: 'Doctor Appointment', date: '2025-03-20', startTime: '14:30', endTime: '15:30', category: 'Personal' },
    { id: 4, title: 'Gym Session', date: '2025-03-15', startTime: '17:00', endTime: '18:00', category: 'Health' },
    { id: 5, title: 'Online Course', date: '2025-03-22', startTime: '19:00', endTime: '20:30', category: 'Learning' },
    { id: 6, title: 'Call with Client', date: '2025-03-16', startTime: '13:00', endTime: '13:30', category: 'Work' },
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      
      // Find events for this day
      const dayEvents = events.filter(event => event.date === dateStr);
      
      days.push({
        day,
        date,
        events: dayEvents,
      });
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Calendar</h1>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Today
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <span className="ml-4 text-lg font-medium text-gray-700 dark:text-gray-300">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          
          <button
            onClick={() => {
              setSelectedDate(new Date());
              setIsModalOpen(true);
            }}
            className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Event
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Calendar Header */}
          <CalendarHeader weekdays={weekdays} />
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
            {calendarDays.map((day, index) => (
              <CalendarDay 
                key={index} 
                day={day} 
                onClick={day ? () => handleDayClick(day.date) : undefined} 
                isToday={
                  day?.date.getDate() === new Date().getDate() && 
                  day.date.getMonth() === new Date().getMonth() && 
                  day.date.getFullYear() === new Date().getFullYear()
                }
              />
            ))}
          </div>
        </div>

        {isModalOpen && selectedDate && (
          <EventModal 
            date={selectedDate} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;