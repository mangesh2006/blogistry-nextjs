"use client";

import { useEffect } from "react";
import { createLowlight } from "lowlight";
import { toHtml } from "hast-util-to-html";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import java from "highlight.js/lib/languages/java";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";
import "highlight.js/styles/atom-one-dark.css";

const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("python", python);
lowlight.register("cpp", cpp);
lowlight.register("c", c);
lowlight.register("java", java);
lowlight.register("css", css);
lowlight.register("php", php);

const BlogContent = ({ content }: { content: string }) => {
  useEffect(() => {
    const applySyntaxHighlighting = () => {
      const codeBlocks = document.querySelectorAll("pre code");

      codeBlocks.forEach((block) => {
        const blockElement = block as HTMLElement;
        const language = blockElement.getAttribute("class")?.split("language-")[1];

        if (language && lowlight) {
          const highlighted = lowlight.highlight(language, blockElement.innerText);

          const html = toHtml(highlighted);

          blockElement.innerHTML = html;
        }
      });
    };

    requestAnimationFrame(applySyntaxHighlighting);
  }, [content]);

  return (
    <article
      className="prose prose-invert max-w-3xl mx-auto break-words 
        [&_pre]:whitespace-pre-wrap 
        [&_pre]:break-words 
        [&_pre]:overflow-x-auto 
        [&_img]:mx-auto"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogContent;
