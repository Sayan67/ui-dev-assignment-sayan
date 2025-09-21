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
  const [selectedRows, setSelectedRows] = useState<{[key: string]: boolean}>({});

  // Column Definitions
  // Mobile columns (simplified version)
  const mobileColumns = useMemo<ColumnDef<Order>[]>(
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
        size: 40,
      },
      {
        id: "mobileView",
        header: () => <span className="text-foreground/40">Order Details</span>,
        cell: ({ row }) => (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{row.original.id}</span>
              <span
                className={cn(
                  "flex items-center gap-1 text-xs",
                  statusColors[row.original.status]
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {row.original.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <img
                src={`https://avatar.iran.liara.run/public/boy?username=${row.original.user.avatar}`}
                alt={row.original.user.name}
                className="w-4 h-4 rounded-full"
              />
              <span>{row.original.user.name}</span>
              <span>•</span>
              <span>{row.original.date}</span>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  // Desktop columns (full version)
  const desktopColumns = useMemo<ColumnDef<Order>[]>(
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

  // Detect if mobile view
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = isMobile ? mobileColumns : desktopColumns;

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection: selectedRows,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setSelectedRows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold">Order List</h1>
      </div>

      <Card className="border-none shadow-none bg-card p-0">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-primary-light dark:bg-primary-light/15 p-2 rounded-xl gap-2">
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

            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full sm:w-[160px] pl-9 h-7"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full">
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
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2 sm:px-6">
            <div className="text-xs text-muted-foreground">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                orders.length
              )}{" "}
              of {orders.length} orders
            </div>
            <Pagination className="w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    className={cn(
                      "h-8 px-2 text-xs",
                      !table.getCanPreviousPage() && "pointer-events-none opacity-50"
                    )}
                  />
                </PaginationItem>
                
                {/* Show limited pages on mobile */}
                {isMobile ? (
                  <>
                    <PaginationItem>
                      <span className="text-xs px-2">
                        {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                      </span>
                    </PaginationItem>
                  </>
                ) : (
                  // Show all pages on desktop
                  new Array(Math.min(table.getPageCount(), 5)).fill(0).map((_, idx) => {
                    const pageNumber = table.getState().pagination.pageIndex > 2 
                      ? table.getState().pagination.pageIndex - 2 + idx
                      : idx;
                    
                    if (pageNumber >= table.getPageCount() || pageNumber < 0) return null;
                    
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          isActive={table.getState().pagination.pageIndex === pageNumber}
                          onClick={(e) => {
                            e.preventDefault();
                            table.setPageIndex(pageNumber);
                          }}
                          className={cn(
                            "text-xs h-8 w-8",
                            table.getState().pagination.pageIndex === pageNumber &&
                            "bg-foreground/10 border-none"
                          )}
                        >
                          {pageNumber + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })
                )}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    className={cn(
                      "h-8 px-2 text-xs",
                      !table.getCanNextPage() && "pointer-events-none opacity-50"
                    )}
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
