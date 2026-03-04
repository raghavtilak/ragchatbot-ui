import { useEffect, useRef, useState } from "react";
import { VscSparkleFilled, VscSend, VscClose, VscChromeMaximize, VscChromeMinimize } from "react-icons/vsc";
import DotTextLoading from "./DotTextLoading";
import "./ChatBox.css";

type Message = {
    id: string;
    sender: "user" | "bot";
    text: string;
    streaming?: boolean;
};

export default function Chatbox() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", sender: "bot", text: "Namaste! 🙏 I'm your Rasoi Assistant. Ask me about Indian recipes, spices, or cooking techniques!" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const eventSourceRef = useRef<EventSource | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const streamBotResponse = (query: string) => {
        eventSourceRef.current = new EventSource(
            `${apiUrl}/stream/${encodeURIComponent(query)}`
        );

        let accumulatedText = "";

        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), sender: "bot", text: "", streaming: true },
        ]);

        eventSourceRef.current.onmessage = (event) => {
            if (event.data === "[DONE]") {
                setLoading(false);
                eventSourceRef.current?.close();
                setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last?.streaming) last.streaming = false;
                    return updated;
                });
                return;
            }

            accumulatedText += event.data;
            setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.streaming) last.text = accumulatedText;
                return updated;
            });
        };

        eventSourceRef.current.onerror = () => {
            eventSourceRef.current?.close();
            setLoading(false);
        };
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), sender: "user", text: input },
        ]);
        setLoading(true);
        streamBotResponse(input);
        setInput("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        return () => eventSourceRef.current?.close();
    }, []);

    return (
        <>
            {/* Floating Button */}
            {!open && (
                <button className="fab" onClick={() => setOpen(true)} title="Open Rasoi Assistant">
                    <VscSparkleFilled />
                    <span className="fab-ring"></span>
                </button>
            )}

            {/* Chat Window */}
            {open && (
                <div className={`chat-window ${expanded ? "expanded" : ""}`}>
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-header-left">
                            <div className="bot-avatar">🍛</div>
                            <div>
                                <div className="chat-title">Rasoi Assistant</div>
                                <div className="chat-status">
                                    <span className="status-dot"></span>
                                    Powered by Ollama + RAG
                                </div>
                            </div>
                        </div>
                        <div className="chat-header-actions">
                            <button className="icon-btn" onClick={() => setExpanded(p => !p)} title={expanded ? "Minimize" : "Expand"}>
                                {expanded ? <VscChromeMinimize /> : <VscChromeMaximize />}
                            </button>
                            <button className="icon-btn" onClick={() => {
                                eventSourceRef.current?.close();
                                setLoading(false);
                                setOpen(false);
                            }} title="Close">
                                <VscClose />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message-row ${msg.sender}`}>
                                {msg.sender === "bot" && (
                                    <div className="msg-avatar">🍛</div>
                                )}
                                <div className={`bubble ${msg.sender}`}>
                                    {msg.text || (msg.streaming && <DotTextLoading />)}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Bar */}
                    <div className="chat-input-bar">
                        <input
                            className="chat-input"
                            value={input}
                            disabled={loading}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about a recipe..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            className={`send-btn ${loading ? "disabled" : ""}`}
                            onClick={sendMessage}
                            disabled={loading}
                            title="Send"
                        >
                            <VscSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
