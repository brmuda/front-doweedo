import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Code2, 
  Clock, 
  Zap,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Github,
  FolderOpen,
  Camera
} from "lucide-react";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { NotificationSettings } from "@/components/profile/NotificationSettings";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { BillingSettings } from "@/components/profile/BillingSettings";
import { GitHubConnect } from "@/components/profile/GitHubConnect";
import { ProjectsSection } from "@/components/profile/ProjectsSection";

const stats = [
  { icon: Code2, label: "Conversions", value: "1,234" },
  { icon: Clock, label: "Hours Saved", value: "48" },
  { icon: Zap, label: "Projects", value: "12" },
];

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "github", label: "GitHub", icon: Github },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const tabTitles: Record<string, { title: string; description: string }> = {
  profile: { title: "Profile Settings", description: "Manage your account settings and preferences" },
  github: { title: "GitHub Integration", description: "Connect your GitHub account and analyze your repositories" },
  projects: { title: "Your Projects", description: "View and manage your code conversion projects" },
  notifications: { title: "Notification Preferences", description: "Choose how you want to be notified" },
  security: { title: "Security Settings", description: "Manage your password and security options" },
  billing: { title: "Billing & Plans", description: "Manage your subscription and payment methods" },
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      case "billing":
        return <BillingSettings />;
      case "github":
        return <GitHubConnect />;
      case "projects":
        return <ProjectsSection />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Profile Header */}
          <div className="glass rounded-2xl p-6 md:p-8 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  AD
                </div>
                <button className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-primary" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-1">Alex Developer</h1>
                <p className="text-muted-foreground mb-4">Full-Stack Developer</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Pro Member
                  </span>
                  <span className="text-sm text-muted-foreground">Member since Dec 2024</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card glass>
                <CardContent className="p-2">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <Card glass className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    {tabTitles[activeTab]?.title}
                  </CardTitle>
                  <CardDescription>
                    {tabTitles[activeTab]?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderTabContent()}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
