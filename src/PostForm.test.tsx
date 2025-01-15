import { render, fireEvent } from '@testing-library/react';
import PostForm from './components/PostForm';
import { PostProvider } from './context/post';

describe('PostForm', () => {
    it('renders the form and submits data', async () => {
        const { getByLabelText, getByText } = render(
            <PostProvider>
                <PostForm />
            </PostProvider>
        );

        fireEvent.change(getByLabelText(/Título/i), { target: { value: 'New Post' } });
        fireEvent.change(getByLabelText(/Cuerpo/i), { target: { value: 'This is the body' } });
        fireEvent.click(getByText(/Agregar Post/i));
    });
});
