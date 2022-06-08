import { Container } from "components/Layout/Container";
import { Notification } from "components/Notification/Notification";
import { useAppSelector } from "store/TypedExports";

export const NotificationsPage: React.FC = () => {
    const currentUser = useAppSelector((state) => state.currentUser);

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
