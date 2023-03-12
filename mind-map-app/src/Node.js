import React from 'react';
import UpdateNodeButton from './UpdateNodeButton';

const Node = ({ node }) => {
  return (
    <div>
      <h2>{node.title}</h2>
      <p>{node.content}</p>
      <UpdateNodeButton nodeId={node._id} />
    </div>
  );
};

export default Node;
