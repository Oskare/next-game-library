import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import StatusSelect from "@/components/ui/status-select";
import React from "react";

export default function StatusSelectCard({ item }: { item: any }) {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Item Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <StatusSelect item={item}></StatusSelect>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}