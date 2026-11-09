export const itemsLoader = async () => {
  const response = await fetch("/data.json");
  if (!response.ok) {
    throw new Error("Failed to load json data");
  }
  const data = await response.json();
  console.log("Loaded items:", data);
  return data;
};
