// utils/localStorage.js

// Check if we are in a browser environment
const isBrowser = typeof window !== "undefined";

// Retrieve favorites from localStorage
export const getFavoritesFromLocalStorage = () => {
  if (isBrowser) {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  }
  return []; // Return an empty array if not in the browser
};

// Add a product to localStorage
export const addFavoriteToLocalStorage = (product) => {
  if (isBrowser) {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }
};

// Remove a product from localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
  if (isBrowser) {
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter(
      (product) => product._id !== productId
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }
};
