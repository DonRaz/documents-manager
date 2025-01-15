"use client";

import { DocumentAction, DocumentVersion } from "@/lib/types/document";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { TimelineIcon } from "./timeline-icon";

interface TimelineEventProps {
  event: DocumentAction | (DocumentVersion & { type: 'version' });
  isSelected: boolean;
  onSelect: () => void;
  isLast: boolean;
}

export function TimelineEvent({ event, isSelected, onSelect, isLast }: TimelineEventProps) {
  const timestamp = 'createdAt' in event ? event.createdAt : event.timestamp;
  const user = 'createdBy' in event ? event.createdBy : event.user;
  const title = 'version' in event ? `Version ${event.version}` : event.type.charAt(0).toUpperCase() + event.type.slice(1);
  const description = 'changes' in event ? event.changes : event.details;

  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-6 top-12 w-px h-full bg-border -z-10" />
      )}
      
      <div
        className={cn(
          "flex gap-4 p-4 rounded-lg transition-colors cursor-pointer",
          isSelected ? "bg-muted" : "hover:bg-muted/50"
        )}
        onClick={onSelect}
      >
        <TimelineIcon type={event.type} />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {formatDistanceToNow(new Date(timestamp))} ago
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-medium">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}