"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, UserCheck, Tag, Clock, MessageSquare, Share2 } from "lucide-react";
import { DocumentVersion, DocumentAction } from "@/lib/types/document";
import { formatDistanceToNow } from "date-fns";

const getActionIcon = (type: DocumentAction['type']) => {
  switch (type) {
    case 'view': return Eye;
    case 'sign': return UserCheck;
    case 'comment': return MessageSquare;
    case 'tag': return Tag;
    case 'share': return Share2;
    default: return FileText;
  }
};

interface VersionHistoryProps {
  versions: DocumentVersion[];
  actions: DocumentAction[];
}

export function VersionHistory({ versions, actions }: VersionHistoryProps) {
  const combinedHistory = [...versions.map(v => ({
    ...v,
    isVersion: true as const,
    timestamp: v.createdAt,
  })), ...actions.map(a => ({
    ...a,
    isVersion: false as const,
  }))].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card className="w-80 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Version History</h3>
        <Button variant="ghost" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          See all
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-4">
          {combinedHistory.map((item) => {
            const Icon = item.isVersion ? FileText : getActionIcon(item.type);
            
            return (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted">
                <div className="mt-1 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {item.isVersion ? item.createdBy.name : item.user.name}
                    </p>
                    {item.isVersion && (
                      <Badge variant="secondary" className="text-xs">
                        {item.version}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.isVersion ? item.changes : item.details}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(item.timestamp))} ago
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}