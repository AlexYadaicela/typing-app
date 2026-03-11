const BASE_URL = "http://localhost:3000/api/v1";

export const getAllTexts = async (token) => {
  const res = await fetch(`${BASE_URL}/texts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch texts");
  }

  return data;
};

export const deleteText = async (token, id) => {
  const res = await fetch(`${BASE_URL}/texts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete text");
  }
  return data;
};

export const createText = async (token, textData) => {
  const res = await fetch(`${BASE_URL}/texts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(textData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create text");
  }

  return data;
};

export const getTextById = async (token, id) => {
  const res = await fetch(`${BASE_URL}/texts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to get text");
  }
  return data;
};

export const updateText = async (token, id, textData) => {
  const res = await fetch(`${BASE_URL}/texts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(textData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update text");
  }

  return data;
};
