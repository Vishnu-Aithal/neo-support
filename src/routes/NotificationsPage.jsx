import { Container } from "components/Layout/Container";
import { Notification } from "components/Notification/Notification";
import { useSelector } from "react-redux";

export const NotificationsPage = () => {
    const currentUser = useSelector((state) => state.currentUser);

    return (
        <Container>
            {currentUser?.notifications?.map((notification) => (
                <Notification
                    key={notification.uid}
                    notification={notification}
                />
            ))}
        </Container>
    );
};
