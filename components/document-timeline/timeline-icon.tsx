import { Eye, UserCheck, Tag, Share2, MessageSquare, FileText } from "lucide-react";
import { DocumentAction } from "@/lib/types/document";

const eventIcons = {
  view: Eye,
  sign: UserCheck,
  tag: Tag,
  share: Share2,
  comment: MessageSquare,
  version: FileText,
};

interface TimelineIconProps {
  type: DocumentAction['type'] | 'version';
}

export function TimelineIcon({ type }: TimelineIconProps) {
  const Icon = type === 'version' ? eventIcons.version : eventIcons[type];

  return (
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}