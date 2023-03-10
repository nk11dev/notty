import React from 'react';
import { Link } from 'react-router-dom';

const PinnedList = () => {

  const linksList = [
    { url: '/example', text: 'Example content' },
  ];

  return (
    <ul>
      {linksList.map((item, index) => (
        <li key={index}>
          <Link
            to={item.url}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PinnedList;