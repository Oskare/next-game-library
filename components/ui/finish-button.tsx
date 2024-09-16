'use client'

import {Button} from "@/components/ui/button";
import {updateStatus} from "@/lib/actions/item";
import React from "react";

export default function FinishButton({ item }: { item: any }) {
  return (
    <Button
      className="bg-green-500 hover:bg-green-700"
      size="sm"
      onClick={() => {
        updateStatus(item.id, 'Finished')
      }}
    >
      Set Finished
    </Button>
  );
}