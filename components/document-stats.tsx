"use client";

import { Card } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function DocumentStats() {
  const stats = [
    {
      title: "Total Documents",
      value: "156",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Pending Signatures",
      value: "23",
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Completed",
      value: "89",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Requires Action",
      value: "12",
      icon: AlertCircle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
}