import { Badge } from "@/components/ui/badge";

export default function PublishedBadge({ published }: { published: boolean }) {
  return (
    <Badge variant={published ? "default" : "secondary"} className={published ? "bg-emerald-700 text-white hover:bg-emerald-700" : ""}>
      {published ? "Published" : "Draft"}
    </Badge>
  );
}
