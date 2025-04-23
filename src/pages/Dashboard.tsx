import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, TrendingUp, ListTodo, MoreHorizontal } from 'lucide-react';
import TaskProgressCard from '../components/dashboard/TaskProgressCard';
import TaskList from '../components/dashboard/TaskList';
import ActivityChart from '../components/dashboard/ActivityChart';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import NewTaskModal from '../components/tasks/NewTaskModal';

// Type definitions
type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  date: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for task progress
  const progressData = [
    { id: 1, name: 'Personal', completed: 6, total: 10, color: 'bg-blue-500' },
    { id: 2, name: 'Work', completed: 12, total: 15, color: 'bg-indigo-500' },
    { id: 3, name: 'Health', completed: 3, total: 5, color: 'bg-teal-500' },
    { id: 4, name: 'Learning', completed: 2, total: 6, color: 'bg-amber-500' },
  ];

  // State for recent tasks
  const [recentTasks, setRecentTasks] = useState<Task[]>([
    { id: 1, title: 'Update project documentation', completed: false, priority: 'high', date: '2025-03-15', category: 'Work' },
    { id: 2, title: 'Prepare presentation for client', completed: true, priority: 'medium', date: '2025-03-14', category: 'Work' },
    { id: 3, title: 'Research new technology stack', completed: false, priority: 'low', date: '2025-03-16', category: 'Learning' },
    { id: 4, title: 'Morning workout routine', completed: true, priority: 'medium', date: '2025-03-15', category: 'Health' },
    { id: 5, title: 'Call family', completed: false, priority: 'high', date: '2025-03-15', category: 'Personal' },
  ]);

  // Upcoming deadlines
  const upcomingTasks: Task[] = [
    { id: 1, title: 'Submit quarterly report', date: '2025-03-17 14:00', category: 'Work', priority: 'high', completed: false },
    { id: 2, title: 'Team meeting', date: '2025-03-18 09:30', category: 'Work', priority: 'medium', completed: false },
    { id: 3, title: 'Dentist appointment', date: '2025-03-20 11:00', category: 'Personal', priority: 'high', completed: false },
    { id: 4, title: 'JavaScript course deadline', date: '2025-03-25 23:59', category: 'Learning', priority: 'medium', completed: false },
  ];

  // Add new task
  const handleNewTask = (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      id: Math.max(0, ...recentTasks.map(t => t.id)) + 1,
      ...task,
      completed: false,
    };
    setRecentTasks([newTask, ...recentTasks]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back! Here's an overview of your tasks.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <Calendar className="w-4 h-4 inline mr-1" />
              Today
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              <ListTodo className="w-4 h-4 inline mr-1" />
              New Task
            </button>
          </div>
        </div>

        {/* Task Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {progressData.map((category) => (
            <TaskProgressCard key={category.id} {...category} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tasks Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mr-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">23 Tasks</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
                <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 mr-4">
                  <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">16 Tasks</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
                <div className="rounded-full bg-teal-100 dark:bg-teal-900/30 p-3 mr-4">
                  <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Productivity</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">+12.5%</p>
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity</h2>
                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <ActivityChart />
            </div>

            {/* Recent Tasks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
              </div>
              <TaskList tasks={recentTasks} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h2>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View Calendar</button>
              </div>
              <UpcomingTasks tasks={upcomingTasks} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <NewTaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={(taskData: Omit<Task, 'id' | 'completed'>) => {
            handleNewTask(taskData);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
