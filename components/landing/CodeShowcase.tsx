"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const languages = [
  { id: "python", name: "Python", color: "text-yellow-400" },
  { id: "javascript", name: "JavaScript", color: "text-yellow-300" },
  { id: "typescript", name: "TypeScript", color: "text-blue-400" },
  { id: "rust", name: "Rust", color: "text-orange-400" },
  { id: "go", name: "Go", color: "text-cyan-400" },
];

const codeExamples: Record<string, string> = {
  python: `def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib`,
  
  javascript: `function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}`,

  typescript: `function fibonacci(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const fib: number[] = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}`,

  rust: `fn fibonacci(n: usize) -> Vec<u64> {
    if n == 0 { return vec![]; }
    if n == 1 { return vec![0]; }
    
    let mut fib = vec![0, 1];
    for i in 2..n {
        let next = fib[i - 1] + fib[i - 2];
        fib.push(next);
    }
    fib
}`,

  go: `func fibonacci(n int) []int {
    if n <= 0 { return []int{} }
    if n == 1 { return []int{0} }
    
    fib := []int{0, 1}
    for i := 2; i < n; i++ {
        fib = append(fib, fib[i-1]+fib[i-2])
    }
    return fib
}`,
};

export function CodeShowcase() {
  const [fromLang, setFromLang] = useState("python");
  const [toLang, setToLang] = useState("javascript");

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See the <span className="gradient-text">Magic</span> in Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch how NexusAI converts code between languages while preserving logic and best practices.
          </p>
        </div>

        {/* Language Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">From:</span>
            <div className="flex gap-1">
              {languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={fromLang === lang.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFromLang(lang.id)}
                  className={fromLang === lang.id ? "" : lang.color}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
          
          <ArrowRight className="h-5 w-5 text-primary hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">To:</span>
            <div className="flex gap-1">
              {languages.filter(l => l.id !== fromLang).map((lang) => (
                <Button
                  key={lang.id}
                  variant={toLang === lang.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setToLang(lang.id)}
                  className={toLang === lang.id ? "" : lang.color}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Code Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* From Code */}
          <div className="glass rounded-2xl overflow-hidden border border-border/50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
              <span className="text-sm font-mono text-muted-foreground">
                {languages.find(l => l.id === fromLang)?.name}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                Source
              </span>
            </div>
            <pre className="p-4 font-mono text-sm overflow-x-auto">
              <code className="text-foreground/90">{codeExamples[fromLang]}</code>
            </pre>
          </div>

          {/* To Code */}
          <div className="glass rounded-2xl overflow-hidden border border-primary/30 glow-primary">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
              <span className="text-sm font-mono text-primary">
                {languages.find(l => l.id === toLang)?.name}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                Converted
              </span>
            </div>
            <pre className="p-4 font-mono text-sm overflow-x-auto">
              <code className="text-foreground/90">{codeExamples[toLang]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
