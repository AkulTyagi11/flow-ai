import React from 'react';

// In a real app, we would use a chart library like Chart.js or Recharts
// For this example, we'll create a simple bar chart representation
const ActivityChart: React.FC = () => {
  // Mock data for weekly task activity
  const activityData = [
    { day: 'Mon', completed: 4, total: 6 },
    { day: 'Tue', completed: 5, total: 8 },
    { day: 'Wed', completed: 7, total: 8 },
    { day: 'Thu', completed: 3, total: 5 },
    { day: 'Fri', completed: 6, total: 10 },
    { day: 'Sat', completed: 2, total: 4 },
    { day: 'Sun', completed: 1, total: 2 },
  ];

  const maxValue = Math.max(...activityData.map(item => item.total));
  
  return (
    <div>
      <div className="grid grid-cols-7 gap-2 h-40 mt-8 mb-2">
        {activityData.map((data, index) => {
          const completedHeight = (data.completed / maxValue) * 100;
          const remainingHeight = ((data.total - data.completed) / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center justify-end h-full">
              <div className="relative w-full">
                <div 
                  className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm" 
                  style={{ height: `${remainingHeight}%` }}
                ></div>
                <div 
                  className="w-full bg-indigo-500 rounded-b-sm" 
                  style={{ height: `${completedHeight}%` }}
                ></div>
              </div>
              <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">{data.day}</span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-indigo-500 rounded-sm mr-1"></span>
          Completed Tasks
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm mr-1"></span>
          Pending Tasks
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;