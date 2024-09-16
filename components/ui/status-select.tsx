'use client'

import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useState} from "react";
import {updateStatus} from "@/lib/actions/item";
import {Status} from "@/lib/definitions";

export default function StatusSelect({ item }: { item: any }) {
  const [status, setStatus] = useState<Status>(item.status);

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
    updateStatus(item.id, newStatus);
  }

  return (
    <>
      <Label htmlFor="status">Status</Label>
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger id="status" aria-label="Select status">
          <SelectValue placeholder="Select status"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Backlog">Backlog</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Finished">Finished</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}