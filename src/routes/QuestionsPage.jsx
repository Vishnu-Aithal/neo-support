import { Container } from "components/Layout/Container";
import { NewPost } from "components/Posts/NewPost";
import { NewPostContainer } from "components/Posts/NewPostContainer";
import { Preview } from "components/Previews/Preview";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { addNewQuestion } from "utils/firebase-utils";
import { useQuestions } from "utils/firebase-utils";

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
    }, [searchTerm, questions]);

    const addClickHandler = () => {
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
    };

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
                <NewPostContainer
                    type="question"
                    title={questionTitle}
                    setTitle={setQuestionTitle}
                    addClickHandler={addClickHandler}
                    body={questionBody}
                    setBody={setQuestionBody}
                />
            )}
            {filteredQuestions.map((question) => (
                <Preview key={question.uid} postData={question} />
            ))}
        </Container>
    );
};
