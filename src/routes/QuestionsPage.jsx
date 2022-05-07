import { Container } from "components/Container";
import { QuestionPreview } from "components/QuestionPreview";

export const QuestionsPage = () => {
    return (
        <Container>
            <div className="w-full flex">
                <select className="border p-2 rounded-md shadow-sm outline-none">
                    <option value="">ALL</option>
                    <option value="">POD A</option>
                    <option value="">POD B</option>
                    <option value="">POD C</option>
                    <option value="">POD D</option>
                </select>
                <input
                    type="text"
                    className="ml-4 w-full p-2 border rounded"
                    placeholder="Search"
                />
            </div>
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
        </Container>
    );
};
