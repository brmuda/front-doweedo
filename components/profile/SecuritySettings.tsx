"use client";

import { useState } from "react";
import { Shield, Key, Smartphone, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const sessions = [
  { device: "MacBook Pro", location: "San Francisco, CA", lastActive: "Now", current: true },
  { device: "iPhone 15", location: "San Francisco, CA", lastActive: "2 hours ago", current: false },
  { device: "Windows PC", location: "New York, NY", lastActive: "3 days ago", current: false },
];

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="space-y-8">
      {/* Password Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Password</h3>
        </div>
        
        {showPasswordForm ? (
          <div className="space-y-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setShowPasswordForm(false)}>Cancel</Button>
              <Button variant="glow">Update Password</Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
            Change Password
          </Button>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Smartphone className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div>
            <p className="font-medium">Enable 2FA</p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
        </div>
      </div>

      {/* Active Sessions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <History className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Active Sessions</h3>
        </div>
        
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{session.device}</p>
                  {session.current && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {session.location} · {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
