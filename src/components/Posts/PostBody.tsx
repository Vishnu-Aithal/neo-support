import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";
import rehypeSanitize from "rehype-sanitize";

export const PostBody = ({ post }) => {
    const darkMode = useSelector((state) => state.theme.darkMode);
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
