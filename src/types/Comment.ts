import { Timestamp } from "firebase/firestore";

export interface CommentType {
    uid: string;
    author: string;
    body: string;
    created: string;
    parentCollection: "links" | "answers" | "questions";
    parentId: string;
}

export interface CommentTypeServer
    extends Omit<CommentType, "uid" | "created"> {
    created: Timestamp;
}
