import Link from "next/link"
import {ChevronLeft, Edit, Trash2,} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Textarea} from "@/components/ui/textarea"
import {getItem} from "@/lib/data/item";
import React from "react";
import {StatusBadge} from "@/components/ui/status-badge";
import EditItemFormModal from "@/components/items/edit-item-form-modal";
import FinishButton from "@/components/ui/finish-button";
import SteamDetailsCard from "@/components/items/steam-details-card";
import StatusSelectCard from "@/components/items/status-select-card";
import ItemDetailCreateFormModal from "@/components/items/item-details/item-detail-create-form-modal";
import ItemDetailDeleteFormModal from "@/components/items/item-details/item-detail-delete-form-modal";


export default async function ItemDetails({ params }: { params: { id: number } }) {
  const itemData = await getItem(params.id);

  const item = itemData[0].item;
  const details = itemData
    .map(d => d.item_detail)
    .filter(d => d !== null);

  let steamDetails = undefined;

  if (item.name) {
    steamDetails = await fetch('https://store.steampowered.com/search/suggest?cc=US&l=english&realm=1&f=jsonfull&term=' + encodeURIComponent(item.name) + '&require_type=game,software')
      .then(res => res.json());
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/items">Items</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/items">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4"/>
                  <span className="sr-only">Back</span>
                </Button>
              </Link>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {item.name}
              </h1>

              <StatusBadge status={item.status}></StatusBadge>

              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                {item.status !== 'Finished' && <FinishButton item={item}/>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <div>
                        Details
                      </div>

                      <EditItemFormModal item={item}>
                        <Edit
                          width="20"
                          className="hover:cursor-pointer"/>
                      </EditItemFormModal>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue={item.name}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue={item.description}
                          className="min-h-32"
                          readOnly
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Created</Label>
                        <Input
                          type="text"
                          defaultValue={item.createdAt?.toLocaleDateString() + " " + item.createdAt?.toLocaleTimeString()}
                          readOnly
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Additional details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  {details.length > 0 &&
                      <CardContent>
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Detail</TableHead>
                                      <TableHead>Created At</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                {details.map((detail) => {
                                  if (detail == null)
                                    return;

                                  return (
                                    <TableRow key={detail?.id}>
                                      <TableCell className="font-semibold">
                                        {detail?.detail}
                                      </TableCell>
                                      <TableCell>
                                        {detail?.createdAt?.toLocaleDateString()}
                                      </TableCell>
                                      <TableCell>
                                        <ItemDetailDeleteFormModal itemId={item.id} detailId={detail.id}>
                                          <Trash2
                                            height="18"
                                            className="hover:cursor-pointer"/>
                                        </ItemDetailDeleteFormModal>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                          </Table>
                      </CardContent>
                  }
                  <CardFooter className="justify-center border-t p-4">
                    <ItemDetailCreateFormModal itemId={item.id}/>
                  </CardFooter>
                </Card>
                <Card
                  className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Trailer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(item.youtubeUrl == undefined || item.youtubeUrl.length <= 0) ?
                      <p className="text-sm text-center">No trailer saved</p>
                      :
                      <iframe className="w-full"
                              height="315"
                              src={item.youtubeUrl}
                              title="YouTube video player" frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <StatusSelectCard item={item}></StatusSelectCard>
                <SteamDetailsCard steamDetails={steamDetails}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}