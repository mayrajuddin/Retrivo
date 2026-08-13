import { useRouteLoaderData } from "react-router";
import HowItWorks from "../../components/Home/HowItWorks";
import RecentItems from "../../components/Home/RecentItems";
import Hero from "../../components/Home/Hero"
const Home = () => {
  const items = useRouteLoaderData("root")
  console.log(items);

  const recentItems = items.slice(0,3)
  console.log(recentItems);
    return (
        <>
            <main>
                <Hero/>
                <RecentItems items={recentItems}/>
                <HowItWorks/>
            </main>
        </>
    );
};

export default Home;