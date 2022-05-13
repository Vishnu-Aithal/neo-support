import { Question } from "components/Posts/Question";
import { Container } from "components/Layout/Container";
import { useAuth } from "contexts/AuthContext";
import { useState, useEffect } from "react";
import {
    addNewAnswer,
    useSingleQuestion,
    useAnswers,
} from "utils/firebase-utils";
import { useParams } from "react-router-dom";
import { Answer } from "components/Posts/Answer";
import { NewPostContainer } from "components/Posts/NewPostContainer";

export const SingleQuestionsPage = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);

    useSingleQuestion(questionId, setQuestion);
    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState([]);
    const [sortedAnswers, setSortedAnswers] = useState([]);
    const [answerTitle, setAnswerTitle] = useState("");

    const [answerBody, setAnswerBody] = useState("");
    useAnswers(questionId, setAnswers);

    useEffect(() => {
        setSortedAnswers(
            answers.sort((a, b) => {
                const aVotes = a.upVotes.length - a.downVotes.length;
                const bVotes = b.upVotes.length - b.downVotes.length;
                return bVotes - aVotes;
            })
        );
    }, [answers]);

    const addClickHandler = () => {
        addNewAnswer({
            title: answerTitle,
            parentId: questionId,
            body: answerBody,
            author: currentUser.uid,
            authorDetails: currentUser,
            upVotes: [],
            downVotes: [],
        });
        setAnswerBody("");
        setAnswerTitle("");
    };

    return (
        <Container>
            {question && <Question question={question} />}
            <div className="border-b-2 w-full p-2 border-zinc-400">
                {answers.length !== 0 ? (
                    <h2 className="font-semibold">{`${answers.length} Answers`}</h2>
                ) : (
                    <h2 className="font-semibold">Not Yet Answered</h2>
                )}
            </div>
            {sortedAnswers.map((answer) => (
                <Answer key={answer.uid} answer={answer} />
            ))}

            {currentUser && (
                <NewPostContainer
                    type="answer"
                    title={answerTitle}
                    setTitle={setAnswerTitle}
                    addClickHandler={addClickHandler}
                    body={answerBody}
                    setBody={setAnswerBody}
                />
            )}
        </Container>
    );
};
