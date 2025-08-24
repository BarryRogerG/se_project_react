const baseUrl = "http://localhost:3001";

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

// Function to add a new clothing item to the server
export const addClothingItem = async (itemData) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

// Function to delete a clothing item from the server
export const deleteClothingItem = async (itemId) => {
  const response = await fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
  handleApiResponse(response);
  return true; // Successfully deleted
};
