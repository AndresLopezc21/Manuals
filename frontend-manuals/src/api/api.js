// src/api/api.js
export const loginUser = async (username, password) => {
  const response = await fetch('/index/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }
  return response.json();
};

export const getManualsCategories = async () => {
  const response = await fetch('/index/manuals-categories');
  if (!response.ok) {
    throw new Error('Error al obtener las categorías');
  }
  return response.json();
};

export const getManualsByCategory = async (categoryId, page = 1, limit = 5) => {
  const response = await fetch(`/index/manuals-by-categorie?manual_categorie_id=${categoryId}&page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Error al obtener los manuales');
  }
  return response.json();
};