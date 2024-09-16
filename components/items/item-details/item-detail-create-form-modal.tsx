"use client"

import React, {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useFormState} from "react-dom";
import {PlusCircle} from "lucide-react";
import {createDetail} from "@/lib/actions/itemdetail";

const initialState = {
  success: false,
  message: "",
};

export default function ItemDetailCreateFormModal({ itemId }: { itemId: number }) {
  const [open, setOpen] = useState(false)

  const [state, createAction] = useFormState(createDetail, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false)
    }
  }, [state.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5"/>
          Add details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new item. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={createAction}>
          <div className="grid gap-4 py-4">
            <Input type="hidden" name="itemId" defaultValue={itemId}/>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="detail" className="text-right">
                Detail
              </Label>
              <Input id="detail" name="detail" className="col-span-3"/>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-col space-y-2">
              <p className="text-red-400 block">{!state?.success && state?.message}</p>
              <Button type="submit">Save changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}