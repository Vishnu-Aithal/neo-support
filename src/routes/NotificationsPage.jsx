import { Container } from "components/Layout/Container";
import { Notification } from "components/Notification/Notification";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { clearNotificationCount } from "utils/firebase-utils";

export const NotificationsPage = () => {
    const { notifications, uid } = useSelector((state) => state.currentUser);
    useEffect(() => {
        (async () => {
            await clearNotificationCount(uid);
        })();
    }, [uid]);
    return (
        <Container>
            {notifications.map((notification) => (
                <Notification
                    key={notification.uid}
                    notification={notification}
                />
            ))}
        </Container>
    );
};
