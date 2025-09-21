import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';

export const RevenueChart: React.FC = () => {
  const { revenueChart } = useAppSelector((state) => state.dashboard.data);

  const chartConfig = {
    current: {
      label: "Current Week",
      color: "hsl(var(--foreground))",
    },
    previous: {
      label: "Previous Week",
      color: "hsl(var(--muted-foreground))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-none shadow-none bg-primary-light dark:bg-primary-light/15 text-foreground">
      <CardHeader>
        <div className="flex items-center gap-4 h-4">
          <CardTitle className="text-sm font-semibold">Revenue</CardTitle>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary-cyan" />
              <span>Current Week <span className='font-semibold'>${revenueChart.currentWeek.toLocaleString()}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-brand" />
              <span>Previous Week <span className='font-semibold'>${revenueChart.previousWeek.toLocaleString()}</span></span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={revenueChart.data}>
            <CartesianGrid vertical={false} className="stroke-foreground/20" />
            <XAxis 
              dataKey="name" 
              axisLine={true}
              tickLine={false}
              className="text-xs"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-xs"
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  // formatter={(value) => `$${value.toLocaleString()}`}
                />
              }
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="var(--secondary-cyan)" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke="var(--primary-brand)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};