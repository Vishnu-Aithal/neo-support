import { Timestamp } from "firebase/firestore";

interface Post {
    uid: string;
    author: string;
    title: string;
    body: string;
    collection: "answers" | "questions";
    created: string;
    downVotes: string[];
    upVotes: string[];
    bookmarkedBy?: string[];
}

export interface AnswerType extends Post {
    parentCollection: "questions";
    parentId: string;
    collection: "answers";
}

export interface AnswerTypeServer extends Omit<AnswerType, "uid" | "created"> {
    created: Timestamp;
}

export interface QuestionType extends Post {
    collection: "questions";
    tags: string[];
    answers: string[];
}

export interface QuestionTypeServer
    extends Omit<QuestionType, "uid" | "created"> {
    created: Timestamp;
}
