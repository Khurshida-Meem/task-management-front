/* eslint-disable react-hooks/exhaustive-deps */
import ReactQuill from "react-quill";
import React, { useEffect, useRef } from "react";
import "quill-mention";

import "react-quill/dist/quill.snow.css"; // Add css for snow theme
// import '../scss/modules/_editor.scss';

const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" },
];
const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" },
];

export default function QuillEditor({
  onChange,
  defaultValue,
  placeholder,
  className,
  theme,
}) {
  const editor = useRef();

  const modules = {
    toolbar: [["bold", "italic", "underline"], ["clean"]],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: function (searchTerm, renderList, mentionChar) {
        let values;

        if (mentionChar === "@") {
          values = atValues;
        } else {
          values = hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
  };

  useEffect(() => {
    if (defaultValue) {
      const delta = editor.current.editor.clipboard.convert(defaultValue);
      editor.current.editor.setContents(delta, "silent");
    }
  }, [defaultValue]);

  return (
    <div className={`w-100 h-full ${className}`}>
      <ReactQuill
        ref={editor}
        theme={theme}
        modules={{ ...modules }}
        onKeyUp={(e) => {
          console.log(e, editor);
          if (editor.current.editor) {
            const delta = editor.current.editor.getContents();
            const html = editor.current.editor.root.innerHTML;
            // onChange({ delta, html });
            console.log({ delta, html });
          }
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
