"use client"

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { saveGuestClient } from '../backend/SaveGuestClient';

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

import {Guests, useGuests, useInvitation} from '../backend/GetGuest'
import { initialGuestValues } from '@/app/dashboard/backend/InitialValue';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formSchema } from '@/app/create/backend/FormSchema';
import { copyToClipboard } from '../backend/Template';


export const columns: ColumnDef<Guests>[] = [
  // {
  //   id: "select",
  //   header: "Check",
  //   cell: ({ row }) => {
  //     useEffect(() => {
  //       if (row.original.check) {
  //         row.toggleSelected(true);
  //       }
  //     }, [row]);
      
  //     return (
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //           <Checkbox
  //               checked={row.getIsSelected()}
  //               onCheckedChange={(value) => row.toggleSelected(!!value)}
  //               aria-label="Select row"
  //             />
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p>Undangannya udah dikasih?</p>
  //           </TooltipContent>
  //         </Tooltip>
  //         </TooltipProvider>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   id: "select",
  //   header: "Check",
  //   cell: ({ row }) => {
  //     const handleCheckChange = async (value) => {
  //       try {
  //         console.log("Wedding Id",row.original.weddingId)
  //         console.log("original Id",row.original)
  //         await updateCheckStatus(row.original.id, value);
  //         row.toggleSelected(!!value);
  //       } catch (error) {
  //         toast.error('Failed to update check status', {
  //           position: "bottom-right",
  //           autoClose: 2000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //       }
  //     };
  
  //     useEffect(() => {
  //       if (row.original.check) {
  //         row.toggleSelected(true);
  //       }
  //     }, [row]);
  
  //     return (
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <Checkbox
  //               checked={row.getIsSelected()}
  //               onCheckedChange={(value) => handleCheckChange(value)}
  //               aria-label="Select row"
  //             />
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p>Undangannya udah dikasih?</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    header: "No",
    cell: ({ row }) => {

      const rowIndex = parseInt(row.id, 10) + 1;

      return (
        <div className="capitalize">
          {rowIndex}
        </div>
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
      const value = row.getValue<string>("whatsapp") || ""; 
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
      const value = row.getValue<string>("email") || ""; 
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
              onClick={() => {
                copyToClipboard(guest);
              
              }}
            >
              Template Text
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(guest.url);
                  toast.success('Link di copy ke clipboard!', {
                    position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                    });
                }}
                className="text-gray-500  dark:text-gray-200"
              >
                Link Undangan
            </DropdownMenuItem>
            <DropdownMenuItem 
             onClick={() => {
               navigator.clipboard.writeText(guest.whatsapp);
               toast.success('Nomor whatsapp di copy ke clipboard!', {
                position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                });
              }}
             className="text-gray-500  dark:text-gray-200"
             >
              Nomor Whatsapp
            </DropdownMenuItem>
            <DropdownMenuItem 
             onClick={() => {
               navigator.clipboard.writeText(guest.email);
               toast.success('Email di copy ke clipboard!', {
                position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                });
              }}
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

const guestSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  check: z.boolean().optional(),
  nickmale: z.string().optional(),
  nickfemale: z.string().optional(),
  weddingId: z.string().nullable().optional(),
});

type GuestSchema = z.infer<typeof guestSchema>;


interface DataTableDemoProps {
  id: string;
}
type FormSchema = z.infer<typeof formSchema>;


export const DataTableDemo: React.FC<DataTableDemoProps> = ({ id }) => {
  const initialGuests = useGuests(id);
  const { invitation: invitationData, error } = useInvitation(id);
  const [guests, setGuests] = useState<Guests[]>(initialGuests);
  const [invitation, setInvitation] = useState<FormSchema | null>(null); 
  const [loading, setLoading] = useState(true);

  console.log("ID", id)
  console.log("INVITATION DATA", invitation)

  useEffect(() => {
    if (initialGuests) {
      setGuests(initialGuests);
      setLoading(false);
    }
  }, [initialGuests]);


  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  console.log("Initial Guests Values", initialGuests)
  console.log("guests", guests)

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    
    data:guests,
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

  const { register, handleSubmit, formState: { errors }, setValue,  } = useForm<GuestSchema>({
    resolver: zodResolver(guestSchema),
  });

  const [urlDummy, setUrlDummy] = useState<string>("")
  const [checkDummy, setCheckDummy] = useState<boolean>(false)
  const [nickmale, setNickmale] = useState<string>("");
  const [nickfemale, setNickfemale] = useState<string>("");
  const [weddingId, setWeddingId] = useState<string>(id)

  useEffect(() => {
    if (invitationData) {
      setInvitation(invitationData);
      const nickmale = invitationData.nicknameMale
      const nickfemale = invitationData.nicknameFemale
      setNickmale(nickmale)
      setNickfemale(nickfemale);
    }
  }, [invitationData]);
  

  useEffect(() => {
    setValue('url', urlDummy);
    setValue('check', checkDummy);
    setValue('weddingId', weddingId);
    setValue('nickmale', nickmale);
    setValue('nickfemale',nickfemale)
    
  }, [checkDummy, urlDummy, weddingId,invitationData, nickmale,nickfemale]);

  const onSubmit: SubmitHandler<GuestSchema> = async (data) => {
    const encodedName = encodeURIComponent(data.name); // Encode the name
    const url = `localhost:2000/${data.weddingId}/${encodedName}`; // Use the encoded name in the URL
    data.url = url; 
    console.log("ON SUBMIT CALLED");
    toast('⏱️ Membuat Undangan', {
      position: "bottom-right",autoClose: 2000,hideProgressBar: true,closeOnClick: true, 
      pauseOnHover: true, draggable: true, progress: undefined,theme: "dark",
      });

    try {
      console.log("Form submitted, calling saveGuestClient...");
      const result = await saveGuestClient(data);
      console.log("Form data:", data);
      console.log("Guest data saved:", result);

      setGuests((prevGuests) => [...prevGuests, data as Guests]);
      toast.success(`Undangan ${data.name} berhasil dibuat 🎊`,{
        position: "bottom-right",autoClose: 2000,hideProgressBar: true,closeOnClick: true,
        pauseOnHover: true,draggable: true,progress: undefined,theme: "dark",
      })
      
    } catch (error) {
      console.error("Error saving guest data:", error);
      toast.error(`Undangan gagal dibuat`,{
        position: "bottom-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true,
        pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
      })
    }
  };

  return (
    <div className="w-full">
      <div>Status: {}</div>
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="cursor-pointer text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:hover:text-green-500 dark:text-white px-3 py-1 rounded">
                + Tambah Tamu
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
            <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Tamu</label>
          <input {...register('name')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors.name && <span className="text-red-500 text-xs">{errors.name?.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">No Whatsapp</label>
          <input {...register('whatsapp')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors.whatsapp && <span className="text-red-500 text-xs">{errors.whatsapp?.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register('email')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email?.message}</span>}
        </div>
 
        <div className="flex justify-center">
          <button type="submit" className="text-gray-600 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer text-sm font-bold">
            Simpan
          </button>
        </div>
      </form>
            </PopoverContent>
          </Popover>
      </div>
      <div className="rounded-md border border-gray-200 shadow-md dark:border-gray-700">
        {loading ? (
         <div className="flex flex-col items-center py-6 justify-center min-h-20">

            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

            <div className="mt-4">
                <h2 className="text-gray-800 dark:text-white">Menyiapkan Data..</h2>
            </div>

        </div>
        ) : guests.length === 0 ? (
          <div className="p-4 text-center">No guests found.</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : (
                          <div className="flex items-center gap-1">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <CaretSortIcon className="ml-2 h-4 w-4" />,
                              desc: <CaretSortIcon className="ml-2 h-4 w-4 rotate-180" />
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )
                      }
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} dari{" "}
          {table.getFilteredRowModel().rows.length} tamu telah diundang. */}

          Undangan dibuat: {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <ToastContainer
            position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false}
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"
            />
        </div>
      
    </div>
  )
}
