import { render, screen, fireEvent } from '@testing-library/react';
import PostsTable from './components/TablePost';
import { PostProvider } from './context/post';

describe('PostsTable', () => {
    it('renders posts and deletes a post', async () => {
        render(
            <PostProvider>
                <PostsTable />
            </PostProvider>
        );
        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);
    });
});
