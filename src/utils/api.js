const baseUrl = "http://localhost:3001";

// Function to fetch all clothing items from the server
export const getClothingItems = async () => {
  try {
    console.log("Fetching clothing items from:", `${baseUrl}/items`);
    const response = await fetch(`${baseUrl}/items`);
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched items:", data.length, "items");
    return data;
  } catch (error) {
    console.error("Failed to fetch clothing items:", error);
    throw error;
  }
};
