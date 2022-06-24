import { Container } from "components/Layout/Container";
import { Notification } from "components/Notification/Notification";
import { useAppSelector } from "store/TypedExports";

export const NotificationsPage: React.FC = () => {
    const currentUser = useAppSelector((state) => state.currentUser);

    return (
        <Container>
            {currentUser?.notifications?.length === 0 && (
                <p className="w-full text-center text-lg font-semibold text-zinc-500">
                    No New Notifications
                </p>
            )}
            {currentUser?.notifications?.map((notification) => (
                <Notification
                    key={notification.uid}
                    notification={notification}
                />
            ))}
        </Container>
    );
};
