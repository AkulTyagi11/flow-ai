import React from 'react';
import { Clock, AlertCircle, Circle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface UpcomingTasksProps {
  tasks: Task[];
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      case 'low':
        return <Circle className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-start p-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
          <div className="flex-shrink-0 mr-3">
            {getPriorityIcon(task.priority)}
          </div>
          <div className="flex-grow min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">{task.title}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                {getFormattedDate(task.date)} at {formatDate(task.date)}
              </span>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full py-2 mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
        View All Upcoming Tasks
      </button>
    </div>
  );
};

export default UpcomingTasks;