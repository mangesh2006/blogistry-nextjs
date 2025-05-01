"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bot, Ellipsis, Send } from "lucide-react";

export default function AI() {
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; content: string }[]
  >([]);
  const [prompt, setPrompt] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: prompt }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { type: "bot", content: data.output }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Something went wrong." },
      ]);
    }

    setPrompt("");
    setLoading(false);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"sm"} variant={"ghost"}>
            <Bot size={16} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[500px] md:w-[700px] max-w-none"
        >
          <SheetTitle className="mx-3.5 text-2xl font-bold">
            AI Agent
          </SheetTitle>
          <SheetHeader>
            <div className="border p-3 h-[82vh] overflow-y-scroll space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`w-fit max-w-[80%] p-3 rounded-lg ${
                    msg.type === "user"
                      ? "bg-accent rounded-br-none ml-auto"
                      : "bg-muted rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {Loading && (
                <div className="flex justify-center items-center">
                  <Ellipsis className="animate-pulse text-4xl" size={50} />
                </div>
              )}
            </div>
          </SheetHeader>
          <SheetFooter>
            <div className="flex justify-center items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Enter prompt..."
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                className="p-2 border outline-none w-full rounded-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <Button
                onClick={handleSend}
                className="hover:bg-accent border p-2"
              >
                <Send />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
