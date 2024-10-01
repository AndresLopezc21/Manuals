// src/components/CategoriesList.js
import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/api';

const CategoriesList = ({ token, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(token);
        setCategories(response.data);
      } catch (err) {
        console.error('Error al obtener categorías', err);
      }
    };
    fetchCategories();
  }, [token]);

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => onSelectCategory(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;