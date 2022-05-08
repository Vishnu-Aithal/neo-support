import { SignIn } from "components/SignIn";
import { useAuth } from "contexts/AuthContext";

export const HomePage = () => {
    const { currentUser } = useAuth();
    return (
        <div className="h-screen w-screen flex items-center justify-center relative bg-slate-50">
            {!currentUser && <SignIn />}
        </div>
    );
};
