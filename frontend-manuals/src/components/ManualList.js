// src/components/ManualsList.js
import React, { useState, useEffect } from 'react';
import { getManualsByCategory } from '../api/api';

const ManualsList = ({ token, manual_categorie_id }) => {
  const [manuals, setManuals] = useState([]);

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const response = await getManualsByCategory(manual_categorie_id, token);
        setManuals(response.data.manuals);
      } catch (err) {
        console.error('Error al obtener manuales', err);
      }
    };
    fetchManuals();
  }, [manual_categorie_id, token]);

  return (
    <div>
      <h2>Manuales</h2>
      <ul>
        {manuals.map((manual) => (
          <li key={manual.id}>{manual.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManualsList;