"use client"

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { guestSchema } from './GuestSchema';
import { saveGuestClient } from './SaveGuestClient';

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {data, Guests} from './Guest'




type GuestSchema= z.infer<typeof guestSchema>;


export const columns: ColumnDef<Guests>[] = [
  {
    id: "select",
    header: "Check",
    cell: ({ row }) => {
      useEffect(() => {
        if (row.original.check) {
          row.toggleSelected(true);
        }
      }, [row]);
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Undangannya udah dikasih?</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>

      );
    },
    enableSorting: false,
    enableHiding: false,
  },

    {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "whatsapp",
    header: "Whatsapp",
    cell: ({ row }) => {
      const value = row.getValue<string>("whatsapp") || ""; // Pastikan value adalah string
      return (
        <div className="capitalize">
          {value === "" ? <em className="font-light text-xs">no data</em> : value}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const value = row.getValue<string>("email") || ""; // Pastikan value adalah string
      return (
        <div className="capitalize">
          {value === "" ? <em className="font-light text-xs">no data</em> : value}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const guest = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Copy</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-green-600  dark:text-green-400"
              onClick={() => navigator.clipboard.writeText(guest.url)}
            >
              Template Text
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(guest.url)}
                className="text-gray-500  dark:text-gray-200"
              >
                Link Undangan
            </DropdownMenuItem>
            <DropdownMenuItem 
             onClick={() => navigator.clipboard.writeText(guest.whatsapp)}
             className="text-gray-500  dark:text-gray-200"
             >
              Nomor Whatsapp
            </DropdownMenuItem>
            <DropdownMenuItem 
             onClick={() => navigator.clipboard.writeText(guest.email)}
             className="text-gray-500  dark:text-gray-200"
             >
              Email
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    console.log("Generated UUID:", checked);
    setValue('check', checked );
  }, [checked]);

  const { register, handleSubmit: handleFormSubmit, setValue, formState: { errors } } = useForm<GuestSchema>({
    resolver: zodResolver(guestSchema), 
  });

  const onSubmit: SubmitHandler<GuestSchema> = async (data) => {
    console.log("ON SUBMIT CALLED")
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key as keyof GuestSchema];
      if (value !== null) {
        formData.append(key, value.toString());
      }
    });
  
    console.log("Form submitted, calling saveWedding...");
    const weddingResult = await saveGuestClient(formData);
    console.log("Form data:", data);
    console.log("WEDDING RESULT", weddingResult);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter nama..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter Kolom <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex mb-2 justify-end">
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="cursor-pointer text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:hover:text-green-500 dark:text-white px-3 py-1 rounded">
                + Tambah Tamu
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Tamu</h4>
                  <p className="text-xs text-muted-foreground">
                    Masukan Nama dan Data (*optional) tamu yang kamu undang
                  </p>
                </div>

                <div className="fl3x">
                  <div className="mb-2 flex flex-col gap-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Tamu</label>
                    <input {...register('name')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                  </div>
                  <div className="mb-2 flex flex-col gap-1">
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-200">No Whatsapp</label>
                    <input {...register('whatsapp')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.whatsapp && <span className="text-red-500 text-xs">{errors.whatsapp.message}</span>}
                  </div>
                  <div className="mb-2 flex flex-col gap-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                    <input {...register('email')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                  </div>

                  <div className="flex justify-center my-2">
                    <button type="submit" className="text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-white px-3 py-2 dark:bg-gray-700 rounded dark:hover:bg-gray-800 cursor-pointer text-sm font-bold">
                      Simpan     
                    </button>
                  </div>
                </div>

              </div>
            </PopoverContent>
          </Popover>
        </form>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada tamu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}