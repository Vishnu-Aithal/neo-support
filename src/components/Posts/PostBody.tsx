import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useAppSelector } from "store/TypedExports";
import { AnswerType, QuestionType } from "types/Post";

interface PostBodyProps {
    post: QuestionType | AnswerType;
}

export const PostBody: React.FC<PostBodyProps> = ({ post }) => {
    const darkMode = useAppSelector((state) => state.theme.darkMode);
    return (
        <div className="p-4" data-color-mode={`${darkMode ? "dark" : "light"}`}>
            <h2 className="text-lg font-medium">{post.title}</h2>
            <MDEditor.Markdown
                className="my-2 dark:p-2 overflow-auto rounded-md"
                source={post.body}
                rehypePlugins={[[rehypeSanitize]]}
            />
        </div>
    );
};
