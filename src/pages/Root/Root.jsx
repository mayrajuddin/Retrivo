import { Outlet } from "react-router";

const Root = () => {
    return (
        <>
            {/* header and footer  */}
            <Outlet/>
        </>
    );
};

export default Root;