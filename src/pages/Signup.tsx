import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mail, Lock, User, Github, Chrome, Check } from "lucide-react";

const features = [
  "Unlimited code conversions",
  "Access to all languages",
  "Priority support",
  "Save your projects",
];

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
    console.log("Signup:", { name, email, password });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
        {/* Background Effects */}
        <div className="fixed inset-0 grid-bg opacity-30" />
        <div className="fixed top-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="fixed bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 relative z-10">
          {/* Features Side */}
          <div className="hidden lg:flex flex-col justify-center animate-slide-in-left">
            <h2 className="text-3xl font-bold mb-4">
              Join the <span className="gradient-text">AI Revolution</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Create your account and start transforming your code with the power of artificial intelligence.
            </p>
            
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signup Form */}
          <Card glass className="animate-slide-in-right">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Start your journey with NexusAI</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="h-11">
                  <Chrome className="h-4 w-4 mr-2" />
                  Google
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters long
                  </p>
                </div>

                <Button type="submit" variant="glow" className="w-full h-11">
                  Create account
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>

              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
