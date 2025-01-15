import React, { useState } from 'react';
import { usePosts } from '../context/post';
import { Button, Modal, Input, Form } from 'antd';

const PostsTable: React.FC = () => {
    const { posts, deletePost, updatePost } = usePosts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<{ id: number; title: string; body: string } | null>(null);

    const openUpdateModal = (post: { id: number; title: string; body: string }) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleUpdate = (values: { title: string; body: string }) => {
        if (selectedPost) {
            updatePost(selectedPost.id, values);
            setIsModalOpen(false);
            setSelectedPost(null);
        }
    };

    return (
        <div>
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="border border-gray-300 px-4 py-2 text-xl text-center">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-xl text-center">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-xl text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="border border-gray-300 px-4 py-2 text-center">{post.id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{post.title}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <Button
                                    onClick={() =>
                                        updatePost(post.id, { title: 'New Title', body: 'Updated Body' })
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 text-base rounded-lg transition-colors mr-2"
                                >
                                    Actualizar
                                </Button>
                                <Button
                                    onClick={() => deletePost(post.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 text-base rounded-lg transition-colors"
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                title="Update Post"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                {selectedPost && (
                    <Form
                        onFinish={handleUpdate}
                        initialValues={{ title: selectedPost.title, body: selectedPost.body }}
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter the title' }]}
                        >
                            <Input placeholder="Enter the title" />
                        </Form.Item>
                        <Form.Item
                            name="body"
                            label="Body"
                            rules={[{ required: true, message: 'Please enter the body' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Enter the body" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-500 text-white"
                            >
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default PostsTable;
