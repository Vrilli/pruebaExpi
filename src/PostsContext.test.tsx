import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostProvider, usePosts } from './context/post';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
  const { posts, loading, notification } = usePosts();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {notification.message && <p>{notification.message}</p>}
    </div>
  );
};

describe('PostsContext', () => {
  it('fetches and displays posts', async () => {
    const mockPosts = [{ id: 1, title: 'Test Post', body: 'This is a test' }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });

    await act(async () => {
      render(
        <PostProvider>
          <TestComponent />
        </PostProvider>
      );
    });

    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('displays an error message if fetching fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch posts'));

    await act(async () => {
      render(
        <PostProvider>
          <TestComponent />
        </PostProvider>
      );
    });

    expect(screen.getByText('Error fetching posts')).toBeInTheDocument(); 
  });
});
