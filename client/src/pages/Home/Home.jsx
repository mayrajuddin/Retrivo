
import { useState } from "react";
import { useRouteLoaderData } from "react-router";

import Hero from "../../components/Home/Hero";
import RecentItems from "../../components/Home/RecentItems";
import HowItWorks from "../../components/Home/HowItWorks";
import { getStoredReports } from "../../utils/reportStorage";

const Home = () => {
  // Static items from data.json
  const staticItems = useRouteLoaderData("root") || [];

  // Recently submitted reports from LocalStorage
  const [reportedItems] = useState(() => {
    return getStoredReports().sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
  });

  // Combine submitted reports and demo items
  const allItems = [...reportedItems, ...staticItems];

  // Show only the latest 3 items
  const recentItems = allItems.slice(0, 3);

  return (
    <main>
      <Hero />

      <RecentItems items={recentItems} />

      <HowItWorks />
    </main>
  );
};

export default Home;
