'use client'

import {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import React, {useState} from "react";
import {deleteItem} from "@/lib/actions/item";

export default function DeleteItemFormModal({ itemId, children }: { itemId: number, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the dropdown from closing
    setIsOpen(true) // Open the modal
  }

  const handleDelete = async () => {
    await deleteItem(itemId);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {/* Clone the child element and add our click handler */}
        {React.cloneElement(children as React.ReactElement, { onClick: handleClick })}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-800" onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}