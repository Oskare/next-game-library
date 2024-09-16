import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import React from "react";
import {getItems} from "@/lib/data/item";
import EditItemFormModal from "@/components/items/edit-item-form-modal";
import DeleteItemFormModal from "@/components/items/delete-item-form-modal";
import Link from "next/link";
import {StatusBadge} from "@/components/ui/status-badge";

export default async function ItemTable({ query, currentPage }: { query: string, currentPage: number }) {

  const items = await getItems(query, currentPage);

  // To test skeleton rendering while loading
  //await new Promise(f => setTimeout(f, 3000));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">
            Description
          </TableHead>
          <TableHead className="hidden md:table-cell">
            Created at
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => <>
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {item.name}
            </TableCell>
            <TableCell>
              <StatusBadge status={item.status}></StatusBadge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item.description}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item.createdAt?.toLocaleString()}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4"/>
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <Link href={`/items/${item.id}`}>
                    <DropdownMenuItem>
                      Open
                    </DropdownMenuItem>
                  </Link>

                  <EditItemFormModal item={item}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </EditItemFormModal>

                  <DeleteItemFormModal itemId={item.id}>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DeleteItemFormModal>

                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </>)}
      </TableBody>
    </Table>
  )
}