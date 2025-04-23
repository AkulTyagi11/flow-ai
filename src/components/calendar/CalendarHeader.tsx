import React from 'react';

interface CalendarHeaderProps {
  weekdays: string[];
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ weekdays }) => {
  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
      {weekdays.map((day, index) => (
        <div 
          key={index}
          className="bg-gray-100 dark:bg-gray-800 text-center py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;