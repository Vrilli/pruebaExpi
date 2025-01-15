import React from 'react';
import { usePosts } from '../context/post';
import { Button } from 'antd';

const NotificationModal: React.FC = () => {
  const { notification, setNotification } = usePosts();

  if (!notification.message) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-50 bg-black`}
      onClick={() => setNotification({ message: '', type: 'success' })}
    >
      <div
        className={`p-6 bg-white rounded shadow-lg max-w-sm w-full text-center transform transition-transform duration-300 ${
          notification.type === 'success' ? 'border-green-500' : 'border-red-500'
        }`}
      >
        <p className={`text-lg font-semibold ${
          notification.type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>{notification.message}</p>
        <Button
          onClick={() => setNotification({ message: '', type: 'success' })}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default NotificationModal;