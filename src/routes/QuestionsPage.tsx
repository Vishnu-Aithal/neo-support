import { Container } from "components/Layout/Container";

import { NewPostContainer } from "components/Posts/NewPostContainer";
import { Preview } from "components/Previews/Preview";

import { useEffect, useState } from "react";
import { setQuestions, setSortedQuestions } from "store/questions-slice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { addNewQuestion } from "utils/firebase-utils";
import { useQuestions } from "utils/firebase-utils";

export const QuestionsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const questions = useAppSelector((state) => state.questions.questions);
    const sortedQuestions = useAppSelector(
        (state) => state.questions.sortedQuestions
    );
    const [questionBody, setQuestionBody] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [newQuestionTags, setNewQuestionTags] = useState<string[]>([]);
    const [showNewQuestion, setShowNewQuestion] = useState(false);
    const currentUser = useAppSelector((state) => state.currentUser);
    const [filters, setFilters] = useState<{
        searchTerm: string;
        filterTags: string[];
        newestFirst: boolean;
        sort: "top-first" | "newest-first" | "oldest-first";
    }>({
        searchTerm: "",
        filterTags: [],
        newestFirst: true,
        sort: "top-first",
    });

    const tags = [
        "Vanilla-JS",
        "Vanilla-CSS",
        "React",
        "Redux",
        "TypeScript",
        "CSS-Frameworks",
        "JS-Frameworks",
    ];

    useQuestions(setQuestions);

    useEffect(() => {
        const searchTermsArray = filters.searchTerm
            .split(" ")
            .filter((_) => _ !== "");
        let filtered = questions.filter(({ title }) => {
            const titleWithoutSpaces = title.replaceAll(" ", "").toLowerCase();

            for (const word of searchTermsArray) {
                if (!titleWithoutSpaces.includes(word)) return false;
            }
            return true;
        });
        if (filters.filterTags.length) {
            filtered = filtered.filter(({ tags }) => {
                for (const tag of tags) {
                    if (filters.filterTags.includes(tag)) return true;
                }
                return false;
            });
        }

        if (filters.sort === "newest-first") {
            filtered.sort((a, b) => {
                return Date.parse(b.created) - Date.parse(a.created);
            });
        } else if (filters.sort === "oldest-first") {
            filtered.sort((a, b) => {
                return Date.parse(a.created) - Date.parse(b.created);
            });
        } else {
            filtered.sort((a, b) => {
                const aVotes = a.upVotes.length - a.downVotes.length;
                const bVotes = b.upVotes.length - b.downVotes.length;
                return bVotes - aVotes;
            });
        }

        dispatch(setSortedQuestions(filtered));
    }, [filters, dispatch, questions]);

    const addClickHandler = () => {
        addNewQuestion({
            title: questionTitle,
            body: questionBody,
            author: currentUser?.uid,
            tags: newQuestionTags,
            answers: [],
            upVotes: [],
            downVotes: [],
        });
        setQuestionTitle("");
        setQuestionBody("");
    };

    const newQuestionTagHandler = (tag: string) => {
        if (newQuestionTags.includes(tag)) {
            setNewQuestionTags(
                newQuestionTags.filter((currentTag) => currentTag !== tag)
            );
        } else {
            setNewQuestionTags([...newQuestionTags, tag]);
        }
    };

    const filterTagsHandler = (tag: string) => {
        if (filters.filterTags.includes(tag)) {
            setFilters({
                ...filters,
                filterTags: filters.filterTags.filter(
                    (filterTag) => filterTag !== tag
                ),
            });
        } else {
            setFilters({
                ...filters,
                filterTags: [...filters.filterTags, tag],
            });
        }
    };
    return (
        <Container>
            <div className="w-full flex flex-wrap gap-2 border dark:border-zinc-600 p-2 rounded shadow-sm">
                <input
                    value={filters.searchTerm}
                    onChange={(e) =>
                        setFilters({ ...filters, searchTerm: e.target.value })
                    }
                    type="text"
                    className="w-full p-2 border dark:border-zinc-600 dark:bg-zinc-700 rounded outline-none focus:shadow-md"
                    placeholder="Search"
                />
                <div className="w-full flex flex-col ml-2 gap-2 text-sm font-semibold text-zinc-500">
                    <h2 className="font-semibold text-zinc-500">SORT</h2>
                    <label htmlFor="top-first">
                        <input
                            className="mr-2 inline-block align-middle"
                            type="radio"
                            name="sort"
                            id="top-first"
                            checked={filters.sort === "top-first"}
                            onChange={(e) =>
                                setFilters({ ...filters, sort: "top-first" })
                            }
                        />
                        Top Post
                    </label>
                    <label htmlFor="newest-first">
                        <input
                            className="mr-2 inline-block align-middle"
                            type="radio"
                            name="sort"
                            id="newest-first"
                            checked={filters.sort === "newest-first"}
                            onChange={(e) =>
                                setFilters({ ...filters, sort: "newest-first" })
                            }
                        />
                        Newest First
                    </label>
                    <label htmlFor="oldest-first">
                        <input
                            className="mr-2 inline-block align-middle"
                            type="radio"
                            name="sort"
                            id="oldest-first"
                            checked={filters.sort === "oldest-first"}
                            onChange={(e) =>
                                setFilters({ ...filters, sort: "oldest-first" })
                            }
                        />
                        Oldest First
                    </label>
                </div>
                <h2 className="ml-2 font-semibold text-zinc-500">
                    FILTER BY TAGS
                </h2>
                <div className="w-full flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={(e) => filterTagsHandler(tag)}
                            className={`${
                                filters.filterTags.includes(tag)
                                    ? "bg-gray-300 dark:bg-gray-600"
                                    : ""
                            } hover:bg-gray-200 dark:hover:bg-zinc-600 border dark:border-zinc-600 rounded-md px-2 py-1`}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={() => setShowNewQuestion(!showNewQuestion)}
                className="w-full p-2 border dark:border-zinc-600 rounded dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 shadow-sm font-semibold">
                {showNewQuestion ? "Close New Question" : "Ask New Question"}
            </button>
            {currentUser && showNewQuestion && (
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
            {sortedQuestions.length === 0 && (
                <p className="w-full text-center text-lg font-semibold text-zinc-500">
                    No Questions
                </p>
            )}
            {sortedQuestions.map((question) => (
                <Preview
                    key={question.uid}
                    postData={question}
                    type={"question"}
                />
            ))}
        </Container>
    );
};
