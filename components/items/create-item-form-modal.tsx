"use client"

import {useEffect, useState} from "react"
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
import {createItem} from "@/lib/actions/item";

const initialState = {
  success: false,
  message: "",
};

export default function CreateItemFormModal() {
  const [open, setOpen] = useState(false)

  const [state, createAction] = useFormState(createItem, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false)
    }
  }, [state.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Item</Button>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" name="description" className="col-span-3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="youtubeUrl" className="text-right">
                Youtube URL
              </Label>
              <Input name="youtubeUrl" className="col-span-3"/>
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