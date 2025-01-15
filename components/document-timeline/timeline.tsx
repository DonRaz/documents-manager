"use client";

import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentAction, DocumentVersion } from "@/lib/types/document";
import { TimelineEvent } from "./timeline-event";
import { TimelineHeader } from "./timeline-header";

interface TimelineProps {
  versions: DocumentVersion[];
  actions: DocumentAction[];
}

export function Timeline({ versions, actions }: TimelineProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const events = useMemo(() => {
    // Combine and normalize events
    let allEvents = [...versions.map(v => ({ 
      ...v, 
      type: 'version' as const,
      id: v.id,
      timestamp: v.createdAt,
      user: v.createdBy,
    })), ...actions];

    // Apply search filter
    if (searchQuery) {
      allEvents = allEvents.filter(event => {
        const user = 'createdBy' in event ? event.createdBy : event.user;
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Apply sorting
    return allEvents.sort((a, b) => {
      const dateA = new Date('createdAt' in a ? a.createdAt : a.timestamp).getTime();
      const dateB = new Date('createdAt' in b ? b.createdAt : b.timestamp).getTime();
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [versions, actions, searchQuery, sortDirection]);

  return (
    <div className="flex flex-col h-full">
      <TimelineHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortDirection={sortDirection}
        onSortChange={() => setSortDirection(prev => prev === "desc" ? "asc" : "desc")}
      />

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-8">
          {events.length > 0 ? (
            events.map((event, idx) => (
              <TimelineEvent
                key={event.id}
                event={event}
                isSelected={selectedId === event.id}
                onSelect={() => setSelectedId(event.id)}
                isLast={idx === events.length - 1}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No activities found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}