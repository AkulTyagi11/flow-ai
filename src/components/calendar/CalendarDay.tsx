import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string; // Added category property
}

interface Day {
  day: number;
  date: Date;
  events: Event[];
}

interface CalendarDayProps {
  day: Day | null;
  onClick?: () => void;
  isToday: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, onClick, isToday }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return 'bg-indigo-500 dark:bg-indigo-600';
      case 'Personal':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'Health':
        return 'bg-teal-500 dark:bg-teal-600';
      case 'Learning':
        return 'bg-amber-500 dark:bg-amber-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  if (!day) {
    return <div className="bg-gray-50 dark:bg-gray-850 min-h-[120px]"></div>;
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 min-h-[120px] p-2 transition-colors duration-200 ${
        onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750' : ''
      }`}
    >
      <div className="flex justify-end">
        <span className={`
          text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
          ${isToday 
            ? 'bg-indigo-600 text-white' 
            : 'text-gray-700 dark:text-gray-300'
          }
        `}>
          {day.day}
        </span>
      </div>
      
      <div className="mt-2 space-y-1 max-h-[80px] overflow-hidden">
        {day.events.slice(0, 3).map((event) => (
          <div 
            key={event.id}
            className={`px-2 py-1 text-xs text-white rounded truncate ${getCategoryColor(event.category)}`}
          >
            {event.startTime} {event.title}
          </div>
        ))}
        
        {day.events.length > 3 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">
            +{day.events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;