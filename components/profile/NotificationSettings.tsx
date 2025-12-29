"use client";

import { useState } from "react";
import { Bell, Mail, MessageSquare, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const notificationOptions = [
  {
    id: "email",
    icon: Mail,
    title: "Email Notifications",
    description: "Receive updates about your conversions via email",
  },
  {
    id: "push",
    icon: Bell,
    title: "Push Notifications",
    description: "Get browser notifications for important updates",
  },
  {
    id: "marketing",
    icon: MessageSquare,
    title: "Marketing Emails",
    description: "Receive tips, tutorials, and product updates",
  },
  {
    id: "activity",
    icon: Zap,
    title: "Activity Alerts",
    description: "Get notified when your code conversions are complete",
  },
];

export function NotificationSettings() {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    email: true,
    push: true,
    marketing: false,
    activity: true,
  });

  const toggleSetting = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {notificationOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <option.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{option.title}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
            <Switch
              checked={settings[option.id]}
              onCheckedChange={() => toggleSetting(option.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button variant="ghost">Reset to Default</Button>
        <Button variant="glow">Save Preferences</Button>
      </div>
    </div>
  );
}
