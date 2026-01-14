import { useEffect, useRef, useState } from "react";
import { VscSparkleFilled, VscSend, VscClose, VscChromeMaximize } from "react-icons/vsc";
import DotTextLoading from "./DotTextLoading";

type Message = {
    id: string;
    sender: "user" | "bot";
    text: string;
    streaming?: boolean;
};

export default function Chatbox() {

    const apiUrl = import.meta.env.VITE_API_URL

    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", sender: "bot", text: "Hi 👋 How can I help you?" },
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
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        position: "fixed",
                        bottom: "2vh",
                        right: "2vw",
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50%",
                        border: "none",
                        background: "#1677ff",
                        color: "#fff",
                        fontSize: "1.2rem",
                        zIndex: 1000,
                        cursor: "pointer",

                    }}
                >
                    <VscSparkleFilled style={{ display: 'flex', justifySelf: 'center' }} />
                </button>
            )}

            {/* Chat Window */}
            {open && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "3vh",
                        right: "3vw",
                        width: "90vw",
                        maxWidth: expanded ? "42rem" : "22rem",
                        height: expanded ? "80vh" : "60vh",
                        background: "#fff",
                        borderRadius: "0.5em",
                        display: "grid",
                        gridTemplateRows: "auto 1fr auto",
                        zIndex: 1000,
                        transition: "all 0.35s ease-in-out",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#1890ff",
                            color: "#fff",
                            borderRadius: "0.5em 0.5em 0 0",
                        }}
                    >
                        <div style={{ flex: 1, fontWeight: 600 }}>Chat Assistant</div>

                        <button
                            onClick={() => setExpanded((p) => !p)}
                            style={iconBtn}
                        >
                            <VscChromeMaximize />
                        </button>

                        <button
                            onClick={() => {
                                eventSourceRef.current?.close();
                                setLoading(false);
                                setOpen(false);
                            }}
                            style={iconBtn}
                        >
                            <VscClose />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            overflowY: "auto",
                            padding: "0.5em",
                        }}
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        msg.sender === "user" ? "flex-end" : "flex-start",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: "75%",
                                        padding: "0.6rem 0.8rem",
                                        borderRadius: "0.75rem",
                                        background: msg.sender === "user" ? "#1677ff" : "#f5f5f5",
                                        color: msg.sender === "user" ? "#fff" : "#000",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {msg.text || (msg.streaming && <DotTextLoading />)}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div
                        style={{
                            display: "flex",
                            padding: "0.5em",
                            gap: "0.5em",
                        }}
                    >
                        <input
                            value={input}
                            disabled={loading}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                color: 'black',
                                backgroundColor: 'white',
                                padding: "0.2em",
                                borderRadius: "0.4em",
                                border: "1px solid #ccc",
                                fontSize: "0.9rem",
                            }}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: "1.2rem",
                                color: "#1677ff",
                            }}
                        >
                            <VscSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

const iconBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginLeft: "0.3em",
};
