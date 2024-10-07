// src/components/ManualsList.js
import React, { useState, useEffect } from 'react';
import { getManualsByCategory } from '../api/api';

const ManualsList = ({ selectedCategory }) => {
  const [manuals, setManuals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalManuals, setTotalManuals] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchManuals = async () => {
      if (!selectedCategory) return;

      try {
        const data = await getManualsByCategory(selectedCategory, currentPage);
        setManuals(data.manuals);
        setTotalManuals(data.pagination.total_manuals);
      } catch (error) {
        setError('Error al obtener los manuales');
      }
    };
    fetchManuals();
  }, [selectedCategory, currentPage]);

  const handleNextPage = () => {
    if (currentPage * 5 < totalManuals) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h2>Manuales</h2>
      {error && <p>{error}</p>}
      <ul>
        {manuals.map((manual) => (
          <li key={manual.id}>
            {manual.name} - {manual.description}
          </li>
        ))}
      </ul>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
      <button onClick={handleNextPage} disabled={currentPage * 5 >= totalManuals}>Siguiente</button>
    </div>
  );
};

export default ManualsList;