import React from "react";
import {clsx} from "clsx";
import {Badge} from "@/components/ui/badge";
import {Status} from "@/lib/definitions"

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant="outline"
      className={clsx(
        status === "Backlog" && "bg-secondary text-secondary-foreground",
        status === "In Progress" && "bg-blue-500 text-white",
        status === "Finished" && "bg-green-500 text-white"
      )}
    >
      {status}
    </Badge>
  )
}