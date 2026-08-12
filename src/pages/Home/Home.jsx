import Hero from "../../components/Hero";
import HowItWorks from "../../components/howItWorks";
import RecentItems from "../../components/RecentItems";

const Home = () => {
    return (
        <>
            <main>
                <Hero/>
                <RecentItems/>
                <HowItWorks/>
            </main>
        </>
    );
};

export default Home;