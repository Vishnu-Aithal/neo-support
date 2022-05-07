import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export const NewPost = () => {
    const [value, setValue] = useState("**Hello world!!!**>");
    return (
        <div data-color-mode="light" className="">
            <MDEditor
                enableScroll
                height={300}
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
                className=" mt-2 border shadow-sm rounded-md p-2 h-72 overflow-auto"
                source={value}
                rehypePlugins={[[rehypeSanitize]]}
            />
        </div>
    );
};
