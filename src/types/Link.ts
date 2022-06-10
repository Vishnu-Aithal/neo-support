import { Timestamp } from "firebase/firestore";

export interface LinkType {
    uid: string;
    author: string;
    collection: "links";
    created: string;
    hasTwoReviews: boolean;
    link: string;
    pod: `${"POD"} ${"A" | "B" | "C" | "D"}`;
    title: string;
}

export interface LinkTypeServer extends Omit<LinkType, "uid" | "created"> {
    created: Timestamp;
}
