import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const AppLayout = ({ option }) => {
    return <div style={{
        padding: '8vh 0px 0px 0px',
        overflow: "hidden",
        backgroundColor: "#e6e6e6"
    }}>
        {
            option == 1 ? (
                <>
                <UserNavbar />
                <Outlet/>
                </>
            ) : (
                option == 2 ? (
                    <>
                    <UserNavbar />
                    <Outlet/></>
                ) : (
                    option == 3 ? (
                        <>
                            <UserNavbar />
                            <Outlet/>
                        </>
                    ) : (
                        option == 4 && (
                            <>
                            <Outlet/>
                        </>
                        )
                    )
                )
            )}
        
    </div>;
};

export default AppLayout;