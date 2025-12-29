"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Code2,
  Sparkles,
  Copy,
  Check,
  Languages,
  Wand2,
  FileCode,
  RefreshCw,
  Paperclip,
  Mic,
  Square,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { VoiceVisualizer } from "@/components/chat/VoiceVisualizer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  code?: string;
  attachment?: {
    name: string;
    type: string;
  };
}

const suggestions = [
  { icon: Languages, text: "Convert Python to JavaScript" },
  { icon: Wand2, text: "Generate a REST API endpoint" },
  { icon: FileCode, text: "Explain this code" },
  { icon: RefreshCw, text: "Optimize for performance" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isRecording, audioLevels, startRecording, stopRecording, cancelRecording } = useVoiceRecorder();

  const handleSend = () => {
    if (!input.trim() && !attachment) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input || (attachment ? `Sent: ${attachment.name}` : ""),
      attachment: attachment ? { name: attachment.name, type: attachment.type } : undefined,
    };

    // Simulate AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Here's the converted code:",
      code: `// Converted code example
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to NexusAI\`;
}

// Usage
greet("Developer");`,
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
    setAttachment(null);
  };

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleVoiceRecord = async () => {
    if (isRecording) {
      const audioBlob = await stopRecording();
      if (audioBlob) {
        // Here you would typically send the audio to a speech-to-text service
        // For now, we'll just show a placeholder
        setInput("🎤 Voice message recorded");
      }
    } else {
      await startRecording();
    }
  };

  const hasInput = input.trim().length > 0 || attachment !== null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16 flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-6 pb-6">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
                <p className="text-muted-foreground mb-8 text-center max-w-md">
                  Convert code, generate solutions, or ask me anything about programming.
                </p>

                {/* Suggestions */}
                <div className="grid sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.text}
                      onClick={() => setInput(suggestion.text)}
                      className="flex items-center gap-3 p-4 rounded-xl glass hover:glow-border transition-all duration-300 text-left group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <suggestion.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4 animate-fade-in",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "glass"
                    )}
                  >
                    {message.attachment && (
                      <div className="flex items-center gap-2 mb-2 text-xs opacity-80">
                        <Paperclip className="h-3 w-3" />
                        <span>{message.attachment.name}</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>

                    {message.code && (
                      <div className="mt-4 rounded-xl bg-background/80 border border-border overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
                          <div className="flex items-center gap-2">
                            <Code2 className="h-4 w-4 text-primary" />
                            <span className="text-xs font-mono text-muted-foreground">JavaScript</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(message.code!, message.id)}
                            className="h-7 px-2"
                          >
                            {copiedId === message.id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <pre className="p-4 text-sm font-mono overflow-x-auto">
                          <code>{message.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">You</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-background via-background to-transparent">
            {/* Attachment Preview */}
            {attachment && (
              <div className="mb-2 flex items-center gap-2 p-2 rounded-lg bg-secondary/50 w-fit">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{attachment.name}</span>
                <button
                  onClick={() => setAttachment(null)}
                  className="p-1 rounded hover:bg-secondary"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Voice Recording Visualizer */}
            {isRecording && (
              <div className="mb-2 flex items-center justify-between p-3 rounded-xl glass">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                  <span className="text-sm text-muted-foreground">Recording...</span>
                </div>
                <VoiceVisualizer audioLevels={audioLevels} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelRecording}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="glass rounded-2xl p-2 flex items-center gap-2">
              {/* Attachment Button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs,.go,.rs,.rb,.php,.html,.css,.json,.md,.txt"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isRecording && handleSend()}
                placeholder="Ask me to convert, explain, or generate code..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isRecording}
              />

              {/* Voice/Send Button */}
              {hasInput ? (
                <Button
                  onClick={handleSend}
                  variant="glow"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleVoiceRecord}
                  variant={isRecording ? "destructive" : "glow"}
                  size="icon"
                >
                  {isRecording ? (
                    <Square className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3 pb-2">
              NexusAI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
