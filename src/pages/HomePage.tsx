import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, MessageSquare, BarChart2, ArrowRight } from 'lucide-react';
import FeatureCard from '../components/home/FeatureCard';
import TestimonialCard from '../components/home/TestimonialCard';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle className="w-10 h-10 text-indigo-600" />,
      title: 'Intelligent Task Management',
      description: 'AI-powered task prioritization and automated reminders to keep you on track.',
    },
    {
      icon: <Calendar className="w-10 h-10 text-teal-600" />,
      title: 'Smart Calendar',
      description: 'Visual timeline of your tasks with drag-and-drop scheduling.',
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-amber-500" />,
      title: 'AI Assistant',
      description: 'Chat with our AI to manage tasks, get recommendations, and answer questions.',
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-blue-500" />,
      title: 'Progress Analytics',
      description: 'Visualize your productivity and track completion trends over time.',
    },
  ];

  const testimonials = [
    {
      name: 'Akul Tyagi',
      role: 'Frontend Developer',
      content: 'Contributed significantly to the website’s frontend, ensuring a smooth and responsive user interface using modern web technologies.',
      avatar: '/src/components/images/tyagi.jpg',
    },
    {
      name: 'Shantam Ranjan',
      role: 'AI/ML Engineer',
      content: 'Developed and integrated AI/ML models, enhancing the system’s intelligence with features like smart recommendations and automation.',
      avatar: '/src/components/images/shantam.jpg',
    },
    {
      name: 'Krishna Singh',
      role: 'Backend Developer',
      content: 'Led the backend development, building robust APIs and ensuring seamless data flow between the server and frontend.',
      avatar: '/src/components/images/krishna.jpg',
    },
    {
      name: 'Vedant Jhina',
      role: 'Frontend Developer',
      content: 'Played a key role in designing and implementing the visual components, bringing the website’s layout and interactions to life.',
      avatar: '/src/components/images/vedant.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Manage Tasks <span className="text-indigo-600 dark:text-indigo-400">Intelligently</span> with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
              Streamline your workflow with our AI-powered task manager. Stay organized, track progress, and get intelligent recommendations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/dashboard" 
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link 
                to="/chat" 
                className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Try AI Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to stay organized and boost your productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How TaskAI Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple, intuitive, and powerful task management powered by AI.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-4">Create Tasks</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Add tasks manually or let our AI suggest tasks based on your patterns and calendar.</p>
              <Link to="/tasks" className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center">
                Try it now <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-4">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Monitor task completion with visual indicators and get insights into your productivity.</p>
              <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center">
                See dashboard <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-4">Get AI Assistance</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Chat with our AI to optimize your schedule, get reminders, and improve workflow.</p>
              <Link to="/chat" className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center">
                Chat with AI <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Meet our team of capable individuals who are dedicated to making your task management experience seamless and efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;