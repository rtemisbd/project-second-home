import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ setEditorValue, editorValue }) => {
  const [height, setHeight] = useState(320); // Default editor height
  const editorRef = useRef(null); // Reference for the editor container

  // Function to handle editor change
  const handleEditorChange = (content) => {
    // const cleanedContent = content;
    // .replace(/^\s*[\r\n]/, "")
    // .replace(/[\r\n]\s*$/, "")
    // .trim();
    // setEditorValue(cleanedContent);
    setEditorValue(content);
  };

  // Simple image upload handler
  const handleImageUpload = (callback, value, meta) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result); // Provide the image URL to TinyMCE
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div
      ref={editorRef} // Reference to the editor container
      //   style={{
      //     position: "relative",
      //     border: "1px solid #ccc",
      //     padding: "8px",
      //     borderRadius: "4px",
      //     resize: "none",
      //     overflow: "hidden",
      //   }}
    >
      <Editor
        apiKey={process.env.TEXT_EDITOR_API}
        value={editorValue}
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          menubar: true,
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // "checklist",
            // "mediaembed",
            // "casechange",
            // "formatpainter",
            // "pageembed",
            // "a11ychecker",
            // "tinymcespellchecker",
            // "permanentpen",
            // "powerpaste",
            // "advtable",
            // "advcode",
            // "editimage",
            // "advtemplate",
            // "mentions",
            // "tableofcontents",
            // "footnotes",
            // "autocorrect",
            // "typography",
            // "inlinecss",
            // "markdown",
            // "importword",
            // "exportword",
            // "exportpdf",
          ],
          toolbar:
            "undo redo | blocks  fontsize | bold italic underline strikethrough | link image media table  |   typography | align  | checklist   indent outdent | emoticons  ",
          file_picker_callback: handleImageUpload,
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt", // Font sizes available
          content_style: `
            body {
              font-size: 16px !important;  
              line-height: 1.6 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            p {
              margin: 10px 10px 0 10px !important; 
            }
          `,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "5px",
          cursor: "row-resize",
          //   backgroundColor: "#e0e0e0",
        }}
      ></div>
    </div>
  );
};

export default TextEditor;
