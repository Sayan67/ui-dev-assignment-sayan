import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const TopSellingProducts: React.FC = () => {
  const { topProducts } = useAppSelector((state) => state.dashboard.data);

  return (
    <Card className="border-none shadow-none bg-primary-light dark:bg-primary-light/15 gap-0 h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent className='text-xs'>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-xs font-normal text-foreground/40">Name</TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">Price</TableHead>
              <TableHead className="text-xs font-normal text-foreground/40">Quantity</TableHead>
              <TableHead className="text-xs font-normal text-foreground/40 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-xs'>
            {topProducts.map((product) => (
              <TableRow key={product.id} className="border-none">
                <TableCell className="">{product.name}</TableCell>
                <TableCell className="">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-right">
                  ${product.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};