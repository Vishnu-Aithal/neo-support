import { Outlet } from "react-router-dom";
import { NavBar } from "components/Layout/NavBar";
import { Header } from "components/Layout/Header";

function App() {
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
