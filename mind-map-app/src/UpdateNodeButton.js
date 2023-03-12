import React, { useState } from 'react';
import axios from 'axios';

const UpdateNodeButton = ({ nodeId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/nodes/${nodeId}`, { title, content });
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleUpdate}>Update Node</button>
  );
};

export default UpdateNodeButton;
