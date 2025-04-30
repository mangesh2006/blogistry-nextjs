"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  UnderlineIcon,
  Code,
  CodeSquareIcon,
} from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import { Image } from "@tiptap/extension-image";
import { useRouter } from "next/navigation";
import { Underline } from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import "highlight.js/styles/atom-one-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import java from "highlight.js/lib/languages/java";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";

const lowlight = createLowlight();

lowlight.register("javascript", javascript);
lowlight.register("python", python);
lowlight.register("cpp", cpp);
lowlight.register("c", c);
lowlight.register("java", java);
lowlight.register("css", css);
lowlight.register("php", php);

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Start writing here...",
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "rounded-lg",
        },
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: "",
  });

  const handleSubmit = async () => {
    if (!title || !editor?.getHTML()) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/create-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        title,
        content: editor.getHTML(),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.status === 200) {
      toast.success("Blog created successfully!");
      setTitle("");
      editor.commands.setContent("<p>Start writing your blog...</p>");
      router.push("/welcome");
    } else if (res.status === 404) {
      toast.error(data.message || "Something went wrong.");
    } else if (res.status === 500) {
      toast.error(data.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white/5 backdrop-blur-md rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-4">Create a New Blog</h2>

      <Input
        placeholder="Title"
        className="mb-4 text-white placeholder:text-gray-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Toolbar */}
      {editor && (
        <div className="flex gap-2 mb-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-white  text-black" : ""}
          >
            <Bold size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-white  text-black" : ""}
          >
            <Italic size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-white  text-black" : ""}
          >
            <Strikethrough size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "bg-white  text-black"
                : ""
            }
          >
            <Heading1 size={16} />
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "bg-white  text-black"
                : ""
            }
          >
            <Heading2 size={16} />
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 })
                ? "bg-white text-black"
                : ""
            }
          >
            <Heading3 size={16} />
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline") ? "bg-white  text-black" : ""
            }
          >
            <UnderlineIcon />
          </Button>
          <select
            className="bg-white text-black border px-2 rounded"
            onChange={(e) =>
              editor
                ?.chain()
                .focus()
                .updateAttributes("codeBlock", {
                  language: e.target.value,
                })
                .setCodeBlock()
                .run()
            }
          >
            <option value="">Select Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="css">CSS</option>
            <option value="php">PHP</option>
          </select>

          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => document.getElementById("upload-image")?.click()}
          >
            <ImageIcon />
          </Button>

          <input
            type="file"
            id="upload-image"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = () => {
                const src = reader.result as string;
                editor.chain().focus().setImage({ src }).run();
              };
              reader.readAsDataURL(file);
            }}
          />
        </div>
      )}

      <div className="rounded-lg p-3 focus:outline-none mx-auto h-[500px] overflow-y-auto">
        <EditorContent
          editor={editor}
          className="rounded-lg p-4 h-full backdrop-blur-md text-white overflow-y-auto"
        />
      </div>

      <Button onClick={handleSubmit} className="mt-6 w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            Publishing...
          </>
        ) : (
          "Publish Blog"
        )}
      </Button>
    </div>
  );
};

export default CreateBlog;
