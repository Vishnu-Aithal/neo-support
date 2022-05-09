import { Question } from "components/Question";
import { Container } from "components/Container";
import { useAuth } from "contexts/AuthContext";
import { NewPost } from "components/NewPost";
import { useState, useEffect } from "react";
import { addNewAnswer, useSingleQuestion, useAnswers } from "utils/firebase";
import { useParams } from "react-router-dom";
import { Answer } from "components/Answer";

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
                <div className="border w-full p-2 rounded-md flex flex-col">
                    <input
                        value={answerTitle}
                        onChange={(e) => setAnswerTitle(e.target.value)}
                        type="text"
                        className="p-2 outline-none border-b mb-3"
                        placeholder="Answer Title"
                    />
                    <NewPost value={answerBody} setValue={setAnswerBody} />

                    <button
                        onClick={() => {
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
                        }}
                        disabled={!(answerBody && setAnswerBody)}
                        className="border px-3 py-1 rounded-md ml-auto mt-3 shadow-md bg-gray-300 disabled:text-gray-500 disabled:shadow-none">
                        Post Answer
                    </button>
                </div>
            )}
        </Container>
    );
};
