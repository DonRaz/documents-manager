"use client";

import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TimelineHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortDirection: "asc" | "desc";
  onSortChange: () => void;
}

export function TimelineHeader({ 
  searchQuery, 
  onSearchChange, 
  sortDirection, 
  onSortChange 
}: TimelineHeaderProps) {
  return (
    <div className="p-4 border-b space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
          placeholder="Filter by user name..."
        />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={onSortChange}
      >
        <ArrowUpDown className="h-4 w-4 mr-2" />
        {sortDirection === "desc" ? "Newest First" : "Oldest First"}
      </Button>
    </div>
  );
}