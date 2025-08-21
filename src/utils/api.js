const baseUrl = "http://localhost:3001";

// Function to fetch all clothing items from the server
export const getClothingItems = async () => {
  try {
    const response = await fetch(`${baseUrl}/items`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch clothing items:", error);
    throw error;
  }
};

// Function to add a new clothing item to the server
export const addClothingItem = async (itemData) => {
  try {
    const response = await fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add clothing item:", error);
    throw error;
  }
};

// Function to delete a clothing item from the server
export const deleteClothingItem = async (itemId) => {
  try {
    const response = await fetch(`${baseUrl}/items/${itemId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; // Successfully deleted
  } catch (error) {
    console.error("Failed to delete clothing item:", error);
    throw error;
  }
};
