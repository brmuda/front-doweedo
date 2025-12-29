"use client";

import { useState } from "react";
import { FolderOpen, Code2, Clock, ArrowRight, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockProjects = [
  {
    id: 1,
    name: "E-commerce API Migration",
    description: "Converted Python Django backend to Go for improved performance",
    fromLang: "Python",
    toLang: "Go",
    date: "Dec 10, 2024",
    status: "completed",
    conversions: 45,
  },
  {
    id: 2,
    name: "React to Vue Migration",
    description: "Migrated dashboard components from React to Vue 3 composition API",
    fromLang: "React",
    toLang: "Vue",
    date: "Dec 5, 2024",
    status: "completed",
    conversions: 23,
  },
  {
    id: 3,
    name: "Legacy PHP Modernization",
    description: "Converting legacy PHP codebase to modern TypeScript",
    fromLang: "PHP",
    toLang: "TypeScript",
    date: "Nov 28, 2024",
    status: "in-progress",
    conversions: 12,
  },
  {
    id: 4,
    name: "Mobile App Backend",
    description: "Swift to Kotlin conversion for cross-platform development",
    fromLang: "Swift",
    toLang: "Kotlin",
    date: "Nov 15, 2024",
    status: "completed",
    conversions: 38,
  },
];

const languageColors: Record<string, string> = {
  Python: "bg-yellow-500/20 text-yellow-400",
  Go: "bg-cyan-500/20 text-cyan-400",
  React: "bg-blue-500/20 text-blue-400",
  Vue: "bg-green-500/20 text-green-400",
  PHP: "bg-purple-500/20 text-purple-400",
  TypeScript: "bg-blue-600/20 text-blue-400",
  Swift: "bg-orange-500/20 text-orange-400",
  Kotlin: "bg-violet-500/20 text-violet-400",
};

export function ProjectsSection() {
  const [projects, setProjects] = useState(mockProjects);
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress">("all");

  const filteredProjects = projects.filter((p) => 
    filter === "all" ? true : p.status === filter
  );

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Your Projects</h3>
          <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">
            {projects.length} total
          </span>
        </div>

        <div className="flex gap-2">
          {(["all", "completed", "in-progress"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f === "completed" ? "Completed" : "In Progress"}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} glass className="group hover:border-primary/50 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">{project.name}</h4>
                    {project.status === "in-progress" && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-md font-mono ${languageColors[project.fromLang]}`}>
                        {project.fromLang}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className={`px-2 py-1 text-xs rounded-md font-mono ${languageColors[project.toLang]}`}>
                        {project.toLang}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Code2 className="h-4 w-4" />
                      {project.conversions} conversions
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {project.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No projects found</p>
        </div>
      )}
    </div>
  );
}
