import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";
import rehypeSanitize from "rehype-sanitize";

export const NewPost = ({ value, setValue }) => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    return (
        <div
            data-color-mode={`${darkMode ? "dark" : "light"}`}
            className="w-full">
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
                className=" my-2 border dark:border-zinc-600 rounded-sm p-2 max-h-72 overflow-auto"
                source={value}
                rehypePlugins={[[rehypeSanitize]]}
            />
        </div>
    );
};
