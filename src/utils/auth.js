import { handleApiResponse } from "./api.js";

const baseUrl = process.env.NODE_ENV === "production"
  ? "http://api.bestbudwtwr.ignorelist.com"
  : "http://localhost:3001";

// POST /signup for user registration
export const signup = async ({ name, avatar, email, password }) => {
  const response = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

// POST /signin for user authorization
export const signin = async ({ email, password }) => {
  const response = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

// GET /users/me to check token validity
export const checkToken = async (token) => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

// PATCH /users/me to update user profile
export const updateUserProfile = async (token, { name, avatar }) => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  const validResponse = handleApiResponse(response);
  const data = await validResponse.json();
  return data;
};

