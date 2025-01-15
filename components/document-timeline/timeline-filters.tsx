"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, SortAsc, SortDesc, Download } from "lucide-react";

interface TimelineFiltersProps {
  onFilterChange: (filters: string[]) => void;
  onSortChange: (direction: 'asc' | 'desc') => void;
  onSearch: (term: string) => void;
}

export function TimelineFilters({ onFilterChange, onSortChange, onSearch }: TimelineFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 p-4 border-b">
      <div className="flex-1">
        <Input 
          placeholder="Search timeline..." 
          onChange={(e) => onSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem onClick={() => onFilterChange(['view'])}>
              Views
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem onClick={() => onFilterChange(['sign'])}>
              Signatures
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem onClick={() => onFilterChange(['version'])}>
              Versions
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem onClick={() => onFilterChange(['share'])}>
              Shares
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange('desc')}
        >
          <SortDesc className="h-4 w-4 mr-2" />
          Sort
        </Button>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}