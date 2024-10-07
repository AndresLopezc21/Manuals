// src/pages/HomePage.js
import React, { useState } from 'react';
import ManualsCategories from '../components/ManualsCategories';
import ManualsList from '../components/ManualsList';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <h1>Página Principal</h1>
      <ManualsCategories onSelectCategory={setSelectedCategory} />
      <ManualsList selectedCategory={selectedCategory} />
    </div>
  );
};

export default HomePage;