import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/nodes')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <p>{item.parent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
