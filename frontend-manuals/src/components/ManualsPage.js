// ManualsPage.js

import React, { useState } from 'react';
import ManualsCategories from './ManualsCategories';
import ManualsList from './ManualsList';

const ManualsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <h1>Manuales</h1>
      <ManualsCategories onSelectCategory={handleSelectCategory} />
      {selectedCategory && <ManualsList selectedCategory={selectedCategory} />}
    </div>
  );
};

export default ManualsPage;