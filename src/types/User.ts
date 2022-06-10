import { NotificationType } from "./Notification";

export interface UserType {
    displayName: string;
    email: string;
    notifications: NotificationType[];
    photoURL: string;
    uid: string;
}
