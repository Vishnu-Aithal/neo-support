import { Container } from "components/Layout/Container";

import { NewPostContainer } from "components/Posts/NewPostContainer";
import { Preview } from "components/Previews/Preview";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, setSortedQuestions } from "store/questions-slice";
import { addNewQuestion } from "utils/firebase-utils";
import { useQuestions } from "utils/firebase-utils";

export const QuestionsPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);
    const sortedQuestions = useSelector(
        (state) => state.questions.sortedQuestions
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [newQuestionTags, setNewQuestionTags] = useState([]);
    const currentUser = useSelector((state) => state.currentUser);

    useQuestions(setQuestions);

    useEffect(() => {
        const searchTermsArray = searchTerm.split(" ").filter((_) => _ !== "");
        const filtered = questions.filter(({ title }) => {
            const titleWithoutSpaces = title.replaceAll(" ", "").toLowerCase();

            for (const word of searchTermsArray) {
                if (!titleWithoutSpaces.includes(word)) return false;
            }
            return true;
        });
        const sorted = [...filtered];
        sorted.sort((a, b) => {
            const aVotes = a.upVotes.length - a.downVotes.length;
            const bVotes = b.upVotes.length - b.downVotes.length;
            return bVotes - aVotes;
        });
        dispatch(setSortedQuestions(sorted));
    }, [searchTerm, dispatch, questions]);

    const addClickHandler = () => {
        addNewQuestion({
            title: questionTitle,
            body: questionBody,
            author: currentUser.uid,
            authorDetails: currentUser,
            tags: newQuestionTags,
            answers: [],
            upVotes: [],
            downVotes: [],
        });
        setQuestionTitle("");
        setQuestionBody("");
    };

    const newQuestionTagHandler = (tag) => {
        if (newQuestionTags.includes(tag)) {
            setNewQuestionTags(
                newQuestionTags.filter((currentTag) => currentTag !== tag)
            );
        } else {
            setNewQuestionTags([...newQuestionTags, tag]);
        }
    };
    return (
        <Container>
            <div className="w-full flex">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    className="w-full p-2 border dark:border-zinc-600 dark:bg-zinc-700 rounded outline-none focus:shadow-md"
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
                    currentTagHandler={newQuestionTagHandler}
                    currentTags={newQuestionTags}
                    tags={tags}
                />
            )}
            {sortedQuestions.map((question) => (
                <Preview key={question.uid} postData={question} />
            ))}
        </Container>
    );
};
