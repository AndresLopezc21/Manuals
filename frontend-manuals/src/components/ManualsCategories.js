// src/components/ManualsCategories.js
import React, { useState, useEffect } from 'react';
import { getManualsCategories } from '../api/api';

const ManualsCategories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getManualsCategories();
        setCategories(data); // Asegúrate de que el formato de la respuesta sea correcto
      } catch (error) {
        setError('Error al obtener las categorías');
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categorías</h2>
      {error && <p>{error}</p>}
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

export default ManualsCategories;