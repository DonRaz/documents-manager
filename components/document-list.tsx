"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, FileText, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DocumentListProps {
  filter?: "pending" | "completed" | "archived";
}

export function DocumentList({ filter }: DocumentListProps) {
  const documents = [
    {
      id: 1,
      name: "Contract Agreement - Smith & Co",
      type: "Legal Contract",
      status: "Pending Signatures",
      lastModified: "2024-03-20",
      signers: ["John Smith", "Sarah Johnson"],
    },
    {
      id: 2,
      name: "Annual Tax Report 2023",
      type: "Tax Document",
      status: "Completed",
      lastModified: "2024-03-19",
      signers: ["Financial Team"],
    },
    {
      id: 3,
      name: "Employee Agreement - Jane Doe",
      type: "HR Document",
      status: "In Review",
      lastModified: "2024-03-18",
      signers: ["HR Manager", "Jane Doe"],
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead className="hidden lg:table-cell">Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Last Modified</TableHead>
              <TableHead className="hidden xl:table-cell">Signers</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <Link href={`/documents/${doc.id}`} className="flex items-center hover:text-primary">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {doc.name}
                  </Link>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{doc.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doc.status === "Completed"
                        ? "success"
                        : doc.status === "Pending Signatures"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{doc.lastModified}</TableCell>
                <TableCell className="hidden xl:table-cell">{doc.signers.join(", ")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/documents/${doc.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden space-y-4 p-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <Link href={`/documents/${doc.id}`} className="flex items-start space-x-3 hover:text-primary">
                <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.type}</p>
                </div>
              </Link>
              <Badge
                variant={
                  doc.status === "Completed"
                    ? "success"
                    : doc.status === "Pending Signatures"
                    ? "warning"
                    : "secondary"
                }
              >
                {doc.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Modified: {doc.lastModified}</p>
              <p>Signers: {doc.signers.join(", ")}</p>
            </div>
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/documents/${doc.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}