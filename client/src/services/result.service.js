const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/results`;

export const saveResult = async (token, resultData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resultData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "failed to save result");
  }
  return data;
};

export const getUserResults = async (token, resultData) => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resultData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to save result");
  }

  return data;
};
