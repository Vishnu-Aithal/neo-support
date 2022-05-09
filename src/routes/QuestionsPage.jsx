import { Container } from "components/Container";
import { NewPost } from "components/NewPost";
import { QuestionPreview } from "components/QuestionPreview";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { addNewQuestion } from "utils/firebase";
import { useQuestions } from "utils/firebase";

export const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const { currentUser } = useAuth();

    useQuestions(setQuestions);

    useEffect(() => {
        setFilteredQuestions(
            questions.sort((a, b) => {
                const aVotes = a.upVotes.length - a.downVotes.length;
                const bVotes = b.upVotes.length - b.downVotes.length;
                return bVotes - aVotes;
            })
        );
    }, [questions]);

    useEffect(() => {
        const searchTermsArray = searchTerm.split(" ").filter((_) => _ !== "");
        const filtered = questions.filter(({ title }) => {
            const titleWithoutSpaces = title.replaceAll(" ", "").toLowerCase();

            for (const word of searchTermsArray) {
                if (!titleWithoutSpaces.includes(word)) return false;
            }
            return true;
        });
        setFilteredQuestions(filtered);
    }, [searchTerm]);

    return (
        <Container>
            <div className="w-full flex">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    className="w-full p-2 border rounded outline-none focus:shadow-md"
                    placeholder="Search"
                />
            </div>
            {currentUser && (
                <div className="border w-full p-2 rounded-md flex flex-col">
                    <input
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        type="text"
                        className="p-2 outline-none border-b mb-3"
                        placeholder="Question Title"
                    />
                    <NewPost value={questionBody} setValue={setQuestionBody} />

                    <button
                        onClick={() => {
                            addNewQuestion({
                                title: questionTitle,
                                body: questionBody,
                                author: currentUser.uid,
                                authorDetails: currentUser,
                                answers: [],
                                upVotes: [],
                                downVotes: [],
                            });
                            setQuestionTitle("");
                            setQuestionBody("");
                        }}
                        disabled={!(questionBody && questionTitle)}
                        className="border px-3 py-1 rounded-md ml-auto mt-3 shadow-md bg-gray-300 disabled:text-gray-500 hover:scale-110 disabled:shadow-none disabled:pointer-events-none">
                        Post Question
                    </button>
                </div>
            )}
            {filteredQuestions.map((question) => (
                <QuestionPreview key={question.uid} postData={question} />
            ))}
        </Container>
    );
};
