"use client";

import { useEffect, useRef } from "react";

export default function Editor({ data, onChange }) {
  const editorRef = useRef(null); 
  const isEditorInitialized = useRef(false);

  useEffect(() => {
    if (isEditorInitialized.current) return;

    const init = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Quote = (await import("@editorjs/quote")).default;

      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [1, 2, 3],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote : Quote

        },
        placeholder: "Start writing...",
        data: data || {},
        onChange: async () => {
          const content = await editor.save();
          if (onChange) onChange(content);
        },
        onReady: () => {
          editorRef.current = editor;
        },
      });

      isEditorInitialized.current = true;
    };

    if (typeof window !== "undefined") {
      init();
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        isEditorInitialized.current = false;
      }
    };
  }, []);

  return (
    <div
      id="editorjs"
      className="min-h-[300px]  bg-white p-4"
    />
  );
}
