import React from 'react';
import Node from './Node';

const NodeList = ({ nodes, onSelectNode, onDeleteNode }) => {
  return (
    <div className="node-list">
      {nodes.map((node) => (
        <Node
          key={node._id}
          node={node}
          onSelectNode={onSelectNode}
          onDeleteNode={onDeleteNode}
        />
      ))}
    </div>
  );
};

export default NodeList;
