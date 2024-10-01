// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import ManualsList from './components/ManualsList';
import CategoriesList from './components/CategoriesListing';

function App() {
  const [token, setToken] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLogin = (user, token) => {
    setToken(token);
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <CategoriesList token={token} onSelectCategory={setSelectedCategory} />
          {selectedCategory && <ManualsList token={token} manual_categorie_id={selectedCategory} />}
        </>
      )}
    </div>
  );
}

export default App;