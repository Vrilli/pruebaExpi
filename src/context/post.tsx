import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface PostProps {
    id: number;
    title: string;
    body: string;
}
interface Notification {
    message: string;
    type: "success" | "error";
}
interface PostType {
    posts: PostProps[];
    loading: boolean;
    createPost: (newPost: Omit<PostProps, 'id'>) => void;
    updatePost: (id: number, updatedPost: Omit<PostProps, "id">) => void
    deletePost: (id: number) => void;
    notification: Notification
    setNotification: React.Dispatch<React.SetStateAction<Notification>>
}

const PostContext = createContext<PostType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [notification, setNotification] = useState<Notification>({ message: "", type: "success" });

    const postFetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get<PostProps[]>('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10')
            setPosts(response.data);
        } catch (error) {
            setNotification({ message: 'Error al cargar el posts', type: 'error' });
        } finally {
            setLoading(false);
        }
    }

    const createPost = async (newPost: Omit<PostProps, 'id'>) => {
        try {
            const response = await axios.post<PostProps>('https://jsonplaceholder.typicode.com/posts', newPost);
            setPosts((prevPosts) => [response.data, ...prevPosts]);
            setNotification({ message: 'Post creado con éxito', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Error al crear el post', type: 'error' });
        }
    }

    const updatePost = async (id: number, updatedPost: Omit<PostProps, 'id'>) => {
        try {
            const response = await axios.put<PostProps>(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === id ? { ...post, ...response.data } : post
                )
            );
            setNotification({ message: 'Post updated successfully', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Error updating post', type: 'error' });
        }
    };


    const deletePost = async (id: number) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            setNotification({ message: 'Post eliminado con éxito', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Error al eliminar', type: 'error' });
        }
    };

    useEffect(() => {
        postFetch();
    }, []);

    return (
        <PostContext.Provider value={{ posts, loading, createPost, updatePost, deletePost, notification, setNotification }}>
            {children}
        </PostContext.Provider>
    )
}

export const usePosts = (): PostType => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts debe usarse dentro de un PostsProvider');
    }
    return context;
};

