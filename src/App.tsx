import React from 'react';
import { PostProvider } from './context/post';
import PostsTable from './components/TablePost';
import PostForm from './components/PostForm';
import NotificationModal from './components/NotificationModal';

const App: React.FC = () => {
  return (
    <PostProvider>
      <div className="p-10 flex flex-col items-center">
        <PostForm />
        <PostsTable />
        <NotificationModal />
      </div>
    </PostProvider>
  );
};

export default App;