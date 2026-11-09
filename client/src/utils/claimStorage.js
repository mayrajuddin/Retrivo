
export const getStoredClaims = () => {
  try {
    const claims = JSON.parse(
      localStorage.getItem("retrivo_claims") || "[]"
    );

    return Array.isArray(claims) ? claims : [];
  } catch (error) {
    console.error("Failed to load claims:", error);
    return [];
  }
};

export const saveStoredClaims = (claims) => {
  localStorage.setItem(
    "retrivo_claims",
    JSON.stringify(claims)
  );
};
