'use client'

import React, {useEffect, useState} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/components/ui/dialog"
import {createItem, deleteItem, updateItem} from "@/lib/actions/item";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useFormState} from "react-dom";

const initialState = {
  success: false,
  message: "",
};

export default function EditItemFormModal({ children, item }: { children: React.ReactNode, item: any }) {
  const [isOpen, setIsOpen] = useState(false)

  const [state, updateAction] = useFormState(updateItem, initialState);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the dropdown from closing
    setIsOpen(true) // Open the modal
  }

  useEffect(() => {
    if (state.success) {
      setIsOpen(false)
    }
  }, [state.success])

  return (
    <>
      {/* Clone the child element and add our click handler */}
      {React.cloneElement(children as React.ReactElement, { onClick: handleClick })}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Item</DialogTitle>
            <DialogDescription>
              Fill in the details to update an item. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form action={updateAction}>
            <div className="grid gap-4 py-4">
              <Input type="hidden" name="id" defaultValue={item.id}/>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" defaultValue={item.name}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" name="description" className="col-span-3" defaultValue={item.description}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="youtubeUrl" className="text-right">
                  Youtube URL
                </Label>
                <Input id="youtubeUrl" name="youtubeUrl" className="col-span-3" defaultValue={item.youtubeUrl}/>
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
    </>
  )
}