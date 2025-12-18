// Use Vite's environment detection
const baseUrl = import.meta.env.PROD
  ? "https://api.bestbudwtwr.ignorelist.com"
  : "http://localhost:3001";

// Helper function to handle API response and check for errors
export const handleApiResponse = (response) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "API server not found. Please make sure json-server is running on port 3001"
      );
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

// Function to fetch all clothing items from the server
export const getClothingItems = async () => {
  const response = await fetch(`${baseUrl}/items`);
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

// Helper function to get token from localStorage
const getToken = () => {
  return localStorage.getItem("jwt");
};

// Function to add a new clothing item to the server
export const addClothingItem = async (itemData) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(itemData),
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

// Function to delete a clothing item from the server
export const deleteClothingItem = async (itemId) => {
  const token = getToken();
  const headers = {};
  
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers,
  });
  handleApiResponse(response);
  return true; // Successfully deleted
};

// Function to add a like to a clothing item
export const addCardLike = async (itemId, token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers,
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

// Function to remove a like from a clothing item
export const removeCardLike = async (itemId, token) => {
  const headers = {};
  
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers,
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};
