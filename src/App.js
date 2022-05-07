import { PullRequestCard } from "components";
import { Post } from "components/Post";
function App() {
    const url = "https://github.com/Vishnu-Aithal/notes-app/pull/1";
    return (
        <div className="App">
            <div className="p-4 border border-black">
                <PullRequestCard url={url} />
            </div>
            <div className="p-4 border border-black">
                <Post />
            </div>
        </div>
    );
}

export default App;
