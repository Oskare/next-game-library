import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React, {Suspense} from "react";
import Search from "@/components/ui/search";
import ItemTable from "@/components/items/item-table";
import Pagination from "@/components/ui/pagination";
import {getItemPages} from "@/lib/data/item";
import SkeletonTable from "@/components/ui/skeletons";
import CreateItemFormModal from "@/components/items/create-item-form-modal";

export default async function ItemList({searchParams}: { searchParams: { query: string, page: string } }) {

  const query = searchParams.query || '';
  const currentPage = Number(searchParams.page) || 1;

  const totalPages = await getItemPages(query);

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Items</CardTitle>
          <CardDescription>
            A list of awesome items!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between gap-2">
            <Search placeholder="Search items..."/>
            <CreateItemFormModal/>
          </div>
          <Suspense key={query + currentPage} fallback={ <SkeletonTable />}>
            <ItemTable query={query} currentPage={currentPage}></ItemTable>
          </Suspense>
        </CardContent>
        <CardFooter>
          <Pagination totalPages={totalPages}></Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}