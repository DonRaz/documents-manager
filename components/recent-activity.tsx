"use client";

import { Avatar } from "@/components/ui/avatar";
import { FileText, UserCheck, Eye, Send } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "John Smith",
      action: "signed",
      document: "Contract Agreement",
      time: "5 minutes ago",
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "viewed",
      document: "Annual Tax Report",
      time: "1 hour ago",
      icon: Eye,
      color: "text-blue-500",
    },
    {
      id: 3,
      user: "Mike Wilson",
      action: "uploaded",
      document: "Employee Agreement",
      time: "2 hours ago",
      icon: FileText,
      color: "text-purple-500",
    },
    {
      id: 4,
      user: "Lisa Anderson",
      action: "shared",
      document: "Partnership Deal",
      time: "3 hours ago",
      icon: Send,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <div className={`mt-1 ${activity.color}`}>
            <activity.icon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>{" "}
              {activity.action} <span className="font-medium">{activity.document}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}