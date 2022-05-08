export const Container = ({ children }) => {
    return (
        <div className="content w-full px-2 py-5 sm:px-5 flex flex-wrap gap-6 content-start overflow-auto sm:justify-start justify-center animate-fade-in">
            {children}
        </div>
    );
};
