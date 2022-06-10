import { Question } from "components/Posts/Question";
import { Container } from "components/Layout/Container";

import { useState, useEffect } from "react";
import {
    addNewAnswer,
    useSingleQuestion,
    useAnswers,
} from "utils/firebase-utils";
import { useParams } from "react-router-dom";
import { Answer } from "components/Posts/Answer";
import { NewPostContainer } from "components/Posts/NewPostContainer";
import { AnswerType, QuestionType } from "types/Post";
import { useAppSelector } from "store/TypedExports";

export const SingleQuestionsPage: React.FC = () => {
    const { questionId } = useParams() as { questionId: string };
    const [question, setQuestion] = useState<QuestionType | null>(null);

    useSingleQuestion(questionId, setQuestion);
    const currentUser = useAppSelector((state) => state.currentUser);
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [sortedAnswers, setSortedAnswers] = useState<AnswerType[]>([]);
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
        addNewAnswer(question!, {
            title: answerTitle,
            parentId: questionId,
            parentCollection: "questions",
            body: answerBody,
            author: currentUser!.uid,
            upVotes: [],
            downVotes: [],
        });
        setAnswerBody("");
        setAnswerTitle("");
    };

    return question ? (
        <Container>
            {<Question question={question} />}
            <div className="border-b-2 w-full p-2 border-zinc-400">
                {answers.length !== 0 ? (
                    <h2 className="font-semibold">{`${answers.length} Answers`}</h2>
                ) : (
                    <h2 className="font-semibold">Not Yet Answered</h2>
                )}
            </div>
            {sortedAnswers.map((answer) => (
                <Answer parent={question} key={answer.uid} answer={answer} />
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
    ) : (
        <h2 className="font-semibold m-auto uppercase text-xl">
            Question Not Found
        </h2>
    );
};
