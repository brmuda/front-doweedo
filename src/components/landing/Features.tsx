import { Code2, Languages, Wand2, Boxes, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Languages,
    title: "Multi-Language Conversion",
    description: "Convert code seamlessly between Python, JavaScript, TypeScript, Go, Rust, and 20+ languages.",
  },
  {
    icon: Wand2,
    title: "Smart Code Generation",
    description: "Generate boilerplate, functions, and entire modules from natural language descriptions.",
  },
  {
    icon: Code2,
    title: "Code Explanation",
    description: "Understand complex code with detailed explanations and documentation generation.",
  },
  {
    icon: Zap,
    title: "Instant Optimization",
    description: "Optimize your code for performance, readability, and best practices automatically.",
  },
  {
    icon: Boxes,
    title: "Framework Migration",
    description: "Migrate between frameworks and libraries while preserving functionality.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your code stays private. We don't store or use your code for training.",
  },
];

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Code Smarter</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful AI tools designed for developers who want to move faster without sacrificing quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-6 hover:glow-primary transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
