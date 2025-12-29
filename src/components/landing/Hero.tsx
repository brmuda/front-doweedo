import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 noise-bg" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Code Studio</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Transform Your Code
            <br />
            <span className="gradient-text">With Intelligence</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Convert code between any programming language, generate solutions, and accelerate your development workflow with the power of AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="glow" size="xl" asChild>
              <Link to="/chat" className="group">
                Start Creating
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/gallery">
                Explore Gallery
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Code2, label: "Multi-Language Support" },
              { icon: Zap, label: "Instant Conversion" },
              { icon: Sparkles, label: "AI-Powered" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Preview Window */}
        <div className="mt-20 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="glass rounded-2xl overflow-hidden border border-border/50 glow-primary">
            {/* Window Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-4">nexus-ai-studio</span>
            </div>
            
            {/* Code Content */}
            <div className="p-6 font-mono text-sm">
              <div className="flex gap-4">
                {/* Line Numbers */}
                <div className="text-muted-foreground/50 select-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Code */}
                <div className="overflow-x-auto">
                  <div><span className="text-accent">function</span> <span className="text-primary">convertCode</span>(input, targetLang) {"{"}</div>
                  <div>  <span className="text-accent">const</span> ai = <span className="text-accent">new</span> <span className="text-primary">NexusAI</span>();</div>
                  <div>  </div>
                  <div>  <span className="text-accent">return</span> ai.<span className="text-primary">transform</span>({"{"}</div>
                  <div>    source: input,</div>
                  <div>    target: targetLang,</div>
                  <div>  {"}"});</div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
