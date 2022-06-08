import MDEditor from "@uiw/react-md-editor";
import { SetStateAction } from "react";
import rehypeSanitize from "rehype-sanitize";
import { useAppSelector } from "store/TypedExports";

interface NewPostProps {
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
}
export const NewPost: React.FC<NewPostProps> = ({ value, setValue }) => {
    const darkMode = useAppSelector((state) => state.theme.darkMode);
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
                onChange={(editor, data, value) =>
                    setValue(editor ? editor : "")
                } // TODO Visit Here
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
