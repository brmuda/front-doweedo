"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Code2,
  Heart,
  Eye,
  Copy,
  Check,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  fromLang: string;
  toLang: string;
  likes: number;
  views: number;
  code: string;
  author: string;
  tags: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Quick Sort Algorithm",
    description: "Efficient sorting algorithm implementation with optimal performance",
    fromLang: "Python",
    toLang: "Rust",
    likes: 234,
    views: 1420,
    code: `fn quick_sort(arr: &mut [i32]) {
    if arr.len() <= 1 { return; }
    let pivot = partition(arr);
    quick_sort(&mut arr[..pivot]);
    quick_sort(&mut arr[pivot + 1..]);
}`,
    author: "DevMaster",
    tags: ["algorithms", "sorting", "performance"],
  },
  {
    id: "2",
    title: "REST API Handler",
    description: "Clean REST API endpoint with error handling and validation",
    fromLang: "JavaScript",
    toLang: "Go",
    likes: 189,
    views: 980,
    code: `func handleRequest(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", 405)
        return
    }
    // Process request...
}`,
    author: "GoNinja",
    tags: ["api", "backend", "http"],
  },
  {
    id: "3",
    title: "React Hook - useDebounce",
    description: "Custom React hook for debouncing values with TypeScript",
    fromLang: "JavaScript",
    toLang: "TypeScript",
    likes: 456,
    views: 2100,
    code: `function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    author: "ReactPro",
    tags: ["react", "hooks", "performance"],
  },
  {
    id: "4",
    title: "Binary Search Tree",
    description: "Complete BST implementation with insert, search, and delete",
    fromLang: "Java",
    toLang: "Python",
    likes: 312,
    views: 1680,
    code: `class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        if value < self.value:
            if self.left: self.left.insert(value)
            else: self.left = BST(value)
        else:
            if self.right: self.right.insert(value)
            else: self.right = BST(value)`,
    author: "AlgoKing",
    tags: ["data-structures", "trees", "algorithms"],
  },
  {
    id: "5",
    title: "WebSocket Client",
    description: "Robust WebSocket client with automatic reconnection",
    fromLang: "Python",
    toLang: "TypeScript",
    likes: 178,
    views: 890,
    code: `class WebSocketClient {
  private ws: WebSocket | null = null;

  connect(url: string): void {
    this.ws = new WebSocket(url);
    this.ws.onclose = () => this.reconnect(url);
    this.ws.onerror = (e) => console.error(e);
  }

  private reconnect(url: string): void {
    setTimeout(() => this.connect(url), 5000);
  }
}`,
    author: "NetworkDev",
    tags: ["websocket", "networking", "realtime"],
  },
  {
    id: "6",
    title: "JWT Authentication",
    description: "Secure JWT token generation and validation",
    fromLang: "Node.js",
    toLang: "Go",
    likes: 567,
    views: 3200,
    code: `func generateToken(userID string) (string, error) {
    claims := jwt.MapClaims{
        "user_id": userID,
        "exp": time.Now().Add(time.Hour * 24).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(secretKey))
}`,
    author: "SecDev",
    tags: ["security", "authentication", "jwt"],
  },
];

const languages = ["All", "Python", "JavaScript", "TypeScript", "Go", "Rust"];

export default function Gallery() {
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesLang =
      selectedLang === "All" ||
      item.fromLang === selectedLang ||
      item.toLang === selectedLang;

    return matchesSearch && matchesLang;
  });

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Community Showcase</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Code <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore code conversions created by the community. Get inspired, learn new patterns, and save your favorites.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, description, or tags..."
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0">
                {languages.map((lang) => (
                  <Button
                    key={lang}
                    variant={selectedLang === lang ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedLang(lang)}
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Code Preview */}
                <div className="relative">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-primary" />
                      <span className="text-xs font-mono text-muted-foreground">
                        {item.fromLang} → {item.toLang}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(item.code, item.id)}
                      className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedId === item.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-hidden max-h-32 bg-background/50">
                    <code className="text-foreground/80">{item.code}</code>
                  </pre>
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">by {item.author}</span>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> {item.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
