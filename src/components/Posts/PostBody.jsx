import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export const PostBody = ({ post }) => {
    return (
        <div className="p-4" data-color-mode="light">
            <h2 className="text-lg font-medium">{post.title}</h2>
            <MDEditor.Markdown
                className="my-2 overflow-auto"
                source={post.body}
                rehypePlugins={[[rehypeSanitize]]}
            />
        </div>
    );
};
