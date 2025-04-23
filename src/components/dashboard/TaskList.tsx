import React from 'react';
import { Check, X, Clock, AlertCircle, Circle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
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

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-3 rounded-lg border ${
            task.completed
              ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
          } transition-all duration-200 hover:shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                  task.completed
                    ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600 flex items-center justify-center'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {task.completed && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className="flex flex-col">
                <span
                  className={`font-medium ${
                    task.completed
                      ? 'text-gray-500 dark:text-gray-400 line-through'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {task.date}
                  </span>
                  <div className="flex items-center" title={`Priority: ${task.priority}`}>
                    {getPriorityIcon(task.priority)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;