// ProjectCard.tsx
"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { FolderOpenDotIcon } from "lucide-react"; // Make sure you have this installed
import type { ProjectType } from "@/types/project"; // Adjust the import path as needed

const ProjectCard = memo(({ project }: { project: ProjectType }) => {
  const router = useRouter();
  const createdAtDate = new Date(project.createdAt);
  const timeAgo = formatDistanceToNow(createdAtDate, { addSuffix: true });
  const thumbnail = project.thumbnail || null;

  const onRoute = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <div
      role="button"
      className="w-full flex flex-col border rounded-xl cursor-pointer hover:shadow-md overflow-hidden"
      onClick={onRoute}
    >
      <div className="h-40 bg-[#eee] relative overflow-hidden flex items-center justify-center">
        {thumbnail ? (
          <img
            src={thumbnail}
            className="w-full h-full object-cover object-left scale-110"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <FolderOpenDotIcon />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-sm truncate w-full mb-1 line-clamp-1">
          {project.name}
        </h3>
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
