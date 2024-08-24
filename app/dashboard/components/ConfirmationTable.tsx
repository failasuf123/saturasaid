'use client'
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Confirmation {
  confirmationId: number;
  name: string;
  type: string;
}

// Fungsi untuk memetakan nilai type ke label yang sesuai
const mapTypeToLabel = (type: string): string => {
  switch (type) {
    case 'bisa-hadir':
      return 'Bisa Hadir';
    case 'belum-bisa-hadir':
      return 'Belum Bisa Hadir';
    case 'belum-tau':
      return 'Belum Tau';
    default:
      return 'Unknown'; // Atau Anda bisa mengembalikan string lain jika diperlukan
  }
};

export function ConfirmationTable({ id }: { id: string }) {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);

  useEffect(() => {
    const fetchConfirmations = async () => {
      try {
        const response = await fetch(`/api/getConfirmationData?id=${id}`);
        const data: Confirmation[] = await response.json();
        setConfirmations(data);
      } catch (error) {
        console.error('Error fetching confirmations:', error);
      }
    };

    if (id) {
      fetchConfirmations();
    }
  }, [id]);

  // Menghitung jumlah setiap status kehadiran
  const counts = confirmations.reduce((acc, confirmation) => {
    const label = mapTypeToLabel(confirmation.type);
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Table>
      <TableCaption>A list of your guest recent confirmations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Nama Tamu</TableHead>
          <TableHead>Konfirmasi Kehadiran</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {confirmations.map((confirmation, index) => (
          <TableRow key={confirmation.confirmationId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{confirmation.name}</TableCell>
            <TableCell>{mapTypeToLabel(confirmation.type)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="font-light">Total Bisa Hadir</TableCell>
          <TableCell className="text-right font-light">{counts['Bisa Hadir'] || 0}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="font-light mt-0">Total Belum Bisa Hadir</TableCell>
          <TableCell className="text-right font-light">{counts['Belum Bisa Hadir'] || 0}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="font-light mt-0">Total Belum Tau</TableCell>
          <TableCell className="text-right font-light">{counts['Belum Tau'] || 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
