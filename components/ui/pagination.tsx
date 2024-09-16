'use client'

import React from "react";
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";
import {clsx} from "clsx";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/solid";

export default function Pagination({totalPages}: { totalPages: number }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="text-sm text-muted-foreground flex h-10 items-center justify-center rounded-md">
        Page{" "}{currentPage}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}

function PaginationArrow({
                           href,
                           direction,
                           isDisabled,
                         }: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon = direction === 'left' ? (
    <ArrowLeftIcon className="w-4"/>
  ) : (
    <ArrowRightIcon className="w-4"/>
  );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}