import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, avatar }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-200 italic">"{content}"</p>
    </div>
  );
};

export default TestimonialCard;