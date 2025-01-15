import React from 'react';
import { usePosts } from '../context/post';
import { Form, Input, Button } from 'antd';

const PostForm: React.FC = () => {
  const { createPost } = usePosts();

  const handleSubmit = (values: { title: string; body: string }) => {
    createPost(values);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl py-6 text-center font-bold'>Agrega tu post</h1>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        className="mb-8 mx-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-full max-w-xl"
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: 'Por favor ingresa un título' }]}
        >
          <Input placeholder="Ingresa el título del post" className='rounded-md border-gray-300' />
        </Form.Item>
        <Form.Item
          name="body"
          label="Cuerpo"
          rules={[{ required: true, message: 'Por favor ingresa el cuerpo del post' }]}
        >
          <Input.TextArea rows={4} placeholder="Ingresa el cuerpo del post" className='rounded-md border-gray-300' />
        </Form.Item>
        <Form.Item>
          <Button className='bg-[#ab82f68e] text-black border-none font-bold w-full' type="primary" htmlType="submit">
            Agregar Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;