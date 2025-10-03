import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ children, bgColor = "bg-gray-100" }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <p className="mt-2 mb-4">
        {children.cardTitle}
      </p>
      <Link
        to={children.buttonLink}
        className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
      >
        {children.buttonText}
      </Link>
    </div>
  )
}

export default Card;