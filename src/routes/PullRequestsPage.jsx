import { Container } from "components/Container";
import { PullRequestCard } from "components/PullRequestCard";

export const PullRequestsPage = ({}) => {
    return (
        <Container>
            <div className="flex w-full">
                <input
                    type="text"
                    className="ml-auto w-full p-2 border rounded"
                    placeholder="Add PR-Link for Review"
                />
                <button className="ml-2 px-3 py-1 border rounded-md shadow-sm">
                    Add
                </button>
            </div>
            <div className="w-full flex">
                <select className="border p-2 rounded-md shadow-sm outline-none">
                    <option value="">ALL</option>
                    <option value="">POD A</option>
                    <option value="">POD B</option>
                    <option value="">POD C</option>
                    <option value="">POD D</option>
                </select>
            </div>
            <PullRequestCard />
            <PullRequestCard />
            <PullRequestCard />
            <PullRequestCard />
            <PullRequestCard />
            <PullRequestCard />
            <PullRequestCard />
        </Container>
    );
};
