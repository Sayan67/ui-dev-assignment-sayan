import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/redux';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export const SalesDonutChart: React.FC = () => {
  const { salesByChannel } = useAppSelector((state) => state.dashboard.data);

  const data = [
    { name: 'Direct', value: salesByChannel.direct, color: 'var(--primary-brand)' },
    { name: 'Affiliate', value: salesByChannel.affiliate, color: 'var(--secondary-mint)' },
    { name: 'Sponsored', value: salesByChannel.sponsored, color: 'var(--secondary-indigo)' },
    { name: 'E-mail', value: salesByChannel.email, color: 'var(--primary-skyblue)' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-none shadow-none bg-primary-light dark:bg-primary-light/15 text-foreground h-[344px] overflow-hidden gap-0">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Total Sales</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <div className="relative">
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
                className='stroke-0'
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  // backgroundColor: 'hsl(var(--card))',
                  // border: '1px solid hsl(var(--border))',
                  fontSize: '12px',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => `${(value/total * 100).toFixed(2)}%`}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{((salesByChannel.direct / total) * 100).toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Direct</div>
            </div>
          </div> */}
        </div>
        <div className="mt-4 space-y-2 px-4">
          {data.map((channel) => (
            <div key={channel.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: channel.color }}
                />
                <span className="text-muted-foreground">{channel.name}</span>
              </div>
              <span className="font-medium">${channel.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};