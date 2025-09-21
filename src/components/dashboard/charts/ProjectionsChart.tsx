import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';

export const ProjectionsChart: React.FC = () => {
  const { projectionsChart } = useAppSelector((state) => state.dashboard.data);

  const chartConfig = {
    projection: {
      label: "Projection",
      color: "hsl(var(--secondary-cyan))",
    },
    actual: {
      label: "Actual",
      color: "hsl(var(--secondary-cyan) / 0.4)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-none xl:w-1/2 h-[300px] xl:h-[252px] py-4 px-0 shadow-none bg-primary-light dark:bg-primary-light/15 text-foreground">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Projections vs Actuals</CardTitle>
      </CardHeader>
      <CardContent className='pr-4'>
        <ChartContainer config={chartConfig} className="h-[220px] xl:h-[180px] w-full">
          <BarChart data={projectionsChart.data}>
            <CartesianGrid vertical={false} className="stroke-foreground/20" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-xs"
              tickFormatter={(value) => `${value}M`}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent
                />
              }
            />
            <Bar
              dataKey="projection"
              stackId="a" 
              fill="var(--secondary-cyan)"
              radius={[4, 4, 0, 0]}
              />
            <Bar 
              dataKey="actual"
              stackId="a"
              fill='var(--secondary-cyan-trans)' 
              className='fill-secondary-cyan/40'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};