import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image"
import React from "react";
import {SteamDetail} from "@/lib/definitions";

export default function SteamDetailsCard({ steamDetails }: { steamDetails: SteamDetail[] }) {
  return (
    <Card x-chunk="dashboard-07-chunk-5">
      <CardHeader>
        <CardTitle>Buy on Steam</CardTitle>
      </CardHeader>
      <CardContent className="min-w-[260px]">
        {steamDetails.length <= 0 &&
            <p className="text-sm">Not found...</p>
        }
        <Table>
          <TableBody>
            {steamDetails.map((steamDetail) => {
              return (
                <TableRow key={steamDetail.id}>
                  <TableCell className="font-semibold">
                    <TooltipProvider delayDuration={20}>
                      <Tooltip>
                        <TooltipTrigger asChild >
                          <a
                            href={`https://store.steampowered.com/search/?term=${encodeURIComponent(steamDetail.name)}`}
                            target="_blank">
                          <Image
                            width="120"
                            height="45"
                            className="min-w-[8rem]"
                            src={steamDetail.img}
                            alt={steamDetail.name}
                          />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{steamDetail.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    {steamDetail.price !== '' ? steamDetail.price : "-"}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}