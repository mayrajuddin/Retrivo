
export const getStoredReports = () => {
  try {
    const reports = JSON.parse(
      localStorage.getItem("retrivo_reports") || "[]"
    );

    return Array.isArray(reports) ? reports : [];
  } catch (error) {
    console.error("Failed to load reports:", error);
    return [];
  }
};

export const saveStoredReports = (reports) => {
  localStorage.setItem(
    "retrivo_reports",
    JSON.stringify(reports)
  );
};
