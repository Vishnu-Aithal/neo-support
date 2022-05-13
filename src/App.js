import { Outlet } from "react-router-dom";
import { NavBar } from "components/Layout/NavBar";
import { Header } from "components/Layout/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "store/currentUser-slice";
import { getUserData, onAuthListener } from "utils/firebase-utils";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const listenerCleaner = onAuthListener(async (user) => {
            if (user) {
                const userData = await getUserData(user);
                dispatch(setCurrentUser(userData));
            } else {
                dispatch(setCurrentUser(null));
            }
        });
        return listenerCleaner;
    }, [dispatch]);
    return (
        <div className="h-screen w-screen flex flex-col text-zinc-700">
            <div className="flex h-full w-full sm:w-11/12 m-auto overflow-auto flex-col  sm:shadow-md">
                <Header />
                <div className="flex h-full w-full overflow-auto relative pb-10">
                    <NavBar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
