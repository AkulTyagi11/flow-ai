import React from 'react';

interface TaskProgressCardProps {
  name: string;
  completed: number;
  total: number;
  color: string;
}

const TaskProgressCard: React.FC<TaskProgressCardProps> = ({ name, completed, total, color }) => {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{completed}/{total} tasks</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{percentage}%</span>
      </div>
    </div>
  );
};

export default TaskProgressCard;