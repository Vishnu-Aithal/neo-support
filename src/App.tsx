import { Outlet } from "react-router-dom";
import { NavBar } from "components/Layout/NavBar";
import { Header } from "components/Layout/Header";
import { useAppSelector } from "store/TypedExports";

function App() {
    const darkMode = useAppSelector((state) => state.theme.darkMode);
    return (
        <div
            className={`h-screen w-screen flex flex-col text-zinc-700 ${
                darkMode ? "dark" : ""
            }`}>
            <div className="flex h-full w-full m-auto overflow-auto flex-col  sm:shadow-md dark:bg-zinc-800 dark:text-zinc-200">
                <Header />
                <div className="flex h-full w-full overflow-auto relative pb-20 sm:pb-2 dark:bg-zinc-800">
                    <NavBar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
