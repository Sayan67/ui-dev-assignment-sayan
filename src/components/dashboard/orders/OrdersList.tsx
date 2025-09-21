"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Plus,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PiArrowDown,
  PiArrowsDownUp,
  PiArrowUp,
  PiCalendarBlank,
  PiClipboardText,
  PiDotsThreeOutlineFill,
  PiFunnelSimple,
} from "react-icons/pi";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { orders } from "@/contants/orders";

export interface Order {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
}

const statusColors = {
  "In Progress": "text-[#8A8CD9]",
  Complete: "text-[#4AA785]",
  Pending: "text-[#59A8D4]",
  Approved: "text-[#FFC555]",
  Rejected: "text-[#1c1c1c]/50 dark:text-[#fff]/50",
};

export const OrdersList: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Column Definitions
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(checked) =>
              table.toggleAllPageRowsSelected(!!checked)
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          />
        ),
      },
      {
        accessorKey: "id",
        header: () => <span className="text-foreground/40">Order ID</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "user",
        header: () => <span className="text-foreground/40">User</span>,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <img
              src={`https://avatar.iran.liara.run/public/boy?username=${row.original.user.avatar}`}
              alt={row.original.user.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{row.original.user.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "project",
        header: () => <span className="text-foreground/40">Project</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "address",
        header: () => <span className="text-foreground/40">Address</span>,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {row.original.address}
            <PiClipboardText
              onClick={() => {
                navigator.clipboard.writeText(row.original.address);
              }}
              className="h-4 w-4 text-muted-foreground cursor-pointer invisible group-hover:visible"
            />
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: () => <span className="text-foreground/40">Date</span>,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <PiCalendarBlank className="h-4 w-4 text-muted-foreground" />
            {row.original.date}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: () => <span className="text-foreground/40">Status</span>,
        cell: ({ row }) => (
          <span
            className={cn(
              "flex items-center gap-1",
              statusColors[row.original.status]
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {row.original.status}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <Button
            size="icon"
            variant="ghost"
            className="invisible group-hover:visible h-7 w-7"
          >
            <PiDotsThreeOutlineFill className="w-3 h-3" />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold">Order List</h1>
      </div>

      <Card className="border-none shadow-none bg-card p-0 w-screen">
        <CardContent className="p-0 gap-0">
          <div className="flex items-center justify-between bg-primary-light dark:bg-primary-light/15 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="h-7 w-7 p-0 cursor-pointer">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 cursor-pointer">
                <PiFunnelSimple className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 cursor-pointer">
                <PiArrowsDownUp className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-[160px] pl-9 h-7"
              />
            </div>
          </div>

          <Table className="">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-border hover:bg-transparent text-xs"
                >
                  {headerGroup.headers.map((header,i) => (
                    <TableHead
                      key={header.id}
                      className="text-foreground/40 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      {i<(headerGroup.headers.length-1)&&( {
                        asc: <PiArrowUp className="inline h-3 w-3 text-muted-foreground ml-1" aria-label="sorted ascending" />,
                        desc: <PiArrowDown className="inline h-3 w-3 text-muted-foreground ml-1" aria-label="sorted descending" />,
                      }[header.column.getIsSorted() as string] ?? <PiArrowsDownUp className="inline h-3 w-3 text-muted-foreground ml-1" />)}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="text-xs font-light">
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-foreground/5 hover:bg-foreground/5 bg-background group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-end w-full text-sm">
            <Pagination className="w-fit flex justify-end px-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    className={`${!table.getCanPreviousPage() && "cursor-not-allowed"}`}
                  />
                </PaginationItem>
                {new Array(table.getPageCount()).fill(0).map((_, page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={table.getState().pagination.pageIndex === page}
                      onClick={(e) => {
                        e.preventDefault();
                        table.setPageIndex(page);
                      }}
                      className={`text-xs ${
                        table.getState().pagination.pageIndex === page &&
                        "bg-foreground/10 border-none"
                      }`}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    className={`${!table.getCanNextPage() && "cursor-not-allowed"}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
