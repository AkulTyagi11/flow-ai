import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import TaskItem from '../components/tasks/TaskItem';
import NewTaskModal from '../components/tasks/NewTaskModal';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  date: string;
  category: string;
}

const Tasks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Finish writing the project proposal for the client meeting',
      completed: false,
      priority: 'high',
      date: '2025-03-15',
      category: 'Work'
    },
    {
      id: 2,
      title: 'Review team presentations',
      completed: true,
      priority: 'medium',
      date: '2025-03-14',
      category: 'Work'
    },
    {
      id: 3,
      title: 'Schedule doctor appointment',
      completed: false,
      priority: 'medium',
      date: '2025-03-17',
      category: 'Personal'
    },
    {
      id: 4,
      title: 'Go for a 5k run',
      description: 'Morning run in the park',
      completed: false,
      priority: 'low',
      date: '2025-03-15',
      category: 'Health'
    },
    {
      id: 5,
      title: 'Learn React hooks',
      completed: true,
      priority: 'medium',
      date: '2025-03-12',
      category: 'Learning'
    },
    {
      id: 6,
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, fruits',
      completed: false,
      priority: 'high',
      date: '2025-03-15',
      category: 'Personal'
    },
    {
      id: 7,
      title: 'Prepare for team meeting',
      completed: false,
      priority: 'high',
      date: '2025-03-16',
      category: 'Work'
    },
  ]);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task = {
      ...newTask,
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
    };
    setTasks([task, ...tasks]);
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
    .filter(task => {
      if (categoryFilter !== 'all') return task.category === categoryFilter;
      return true;
    })
    .filter(task => {
      if (searchQuery) {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return true;
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Tasks</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="pl-10 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${filter === 'all'
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('incomplete')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${filter === 'incomplete'
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                To Do
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${filter === 'completed'
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Completed
              </button>
            </div>

            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Learning">Learning</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Task List</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredTasks.filter(t => !t.completed).length} remaining
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTaskCompletion(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500 dark:text-gray-400">
              No tasks found. Create a new task to get started!
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <NewTaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={(task) => {
            addTask(task);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Tasks;