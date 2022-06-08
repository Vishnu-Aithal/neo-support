export interface NotificationType {
    author: "string";
    parent: "string";
    parentCollection: "questions" | "answers" | "links";
    read: boolean;
    type: "comment" | "answer";
    uid: "string";
    bookmarked?: boolean;
}
