import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export const NewPost = ({ value, setValue }) => {
    return (
        <div data-color-mode="light" className="w-full">
            <MDEditor
                enableScroll
                minHeight={100}
                maxHeight={500}
                preview="edit"
                commandsFilter={(command, isExtra) =>
                    isExtra ? false : command
                }
                visiableDragbar={false}
                value={value}
                onChange={setValue}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
            <MDEditor.Markdown
                className=" my-2 border rounded-sm p-2 max-h-72 overflow-auto"
                source={value}
                rehypePlugins={[[rehypeSanitize]]}
            />
        </div>
    );
};
