import { useState } from "react";
import { Github, GitBranch, FolderGit2, BarChart3, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";

const mockRepos = [
  { name: "react-dashboard", stars: 234, language: "TypeScript", selected: false },
  { name: "api-gateway", stars: 89, language: "Go", selected: false },
  { name: "ml-pipeline", stars: 156, language: "Python", selected: true },
  { name: "mobile-app", stars: 45, language: "Dart", selected: false },
];

const languageData = [
  { name: "TypeScript", value: 35, color: "hsl(210, 90%, 60%)" },
  { name: "Python", value: 25, color: "hsl(45, 90%, 55%)" },
  { name: "JavaScript", value: 20, color: "hsl(45, 100%, 50%)" },
  { name: "Go", value: 12, color: "hsl(190, 90%, 55%)" },
  { name: "Other", value: 8, color: "hsl(270, 60%, 60%)" },
];

const commitData = [
  { month: "Jul", commits: 45 },
  { month: "Aug", commits: 62 },
  { month: "Sep", commits: 38 },
  { month: "Oct", commits: 85 },
  { month: "Nov", commits: 72 },
  { month: "Dec", commits: 91 },
];

const codeQualityData = [
  { metric: "Maintainability", score: 85 },
  { metric: "Reliability", score: 92 },
  { metric: "Security", score: 78 },
  { metric: "Coverage", score: 65 },
];

const chartConfig = {
  commits: { label: "Commits", color: "hsl(var(--primary))" },
  score: { label: "Score", color: "hsl(var(--accent))" },
};

export function GitHubConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [repos, setRepos] = useState(mockRepos);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const toggleRepo = (index: number) => {
    setRepos(repos.map((repo, i) => 
      i === index ? { ...repo, selected: !repo.selected } : repo
    ));
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-border/50">
          <Github className="h-10 w-10" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect Your GitHub Account</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Link your GitHub account to analyze your repositories and get insights about your code quality, patterns, and more.
        </p>
        <Button variant="glow" size="lg" onClick={handleConnect} className="gap-2">
          <Github className="h-5 w-5" />
          Connect with GitHub
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Connected Account */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-border/50">
            <Github className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">@alexdeveloper</p>
              <Check className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-sm text-muted-foreground">Connected · 12 repositories</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
          Disconnect
        </Button>
      </div>

      {/* Repository Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-primary" />
            Select Repositories
          </h3>
          <Button variant="ghost" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {repos.map((repo, index) => (
            <button
              key={repo.name}
              onClick={() => toggleRepo(index)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                repo.selected
                  ? "border-primary bg-primary/10"
                  : "border-border/50 bg-secondary/30 hover:border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <GitBranch className={`h-5 w-5 ${repo.selected ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <p className="font-medium">{repo.name}</p>
                  <p className="text-sm text-muted-foreground">{repo.language} · ⭐ {repo.stars}</p>
                </div>
              </div>
              {repo.selected && <Check className="h-5 w-5 text-primary" />}
            </button>
          ))}
        </div>

        <Button 
          variant="glow" 
          className="w-full gap-2" 
          onClick={handleAnalyze}
          disabled={analyzing || !repos.some(r => r.selected)}
        >
          {analyzing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4" />
              Analyze Selected Repositories
            </>
          )}
        </Button>
      </div>

      {/* Analysis Results */}
      {showAnalysis && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Code Analysis Results
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Language Distribution */}
            <Card glass>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Language Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {languageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {languageData.map((lang) => (
                    <span key={lang.name} className="flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                      {lang.name} ({lang.value}%)
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Commit Activity */}
            <Card glass>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Commit Activity</h4>
                <ChartContainer config={chartConfig} className="h-48">
                  <LineChart data={commitData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="commits" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Code Quality Metrics */}
            <Card glass className="md:col-span-2">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Code Quality Metrics</h4>
                <ChartContainer config={chartConfig} className="h-48">
                  <BarChart data={codeQualityData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis type="category" dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
