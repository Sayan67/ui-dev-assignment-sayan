import React from "react";
import { useAppSelector } from "@/hooks/redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectionsChart } from "./charts/ProjectionsChart";
import { RevenueChart } from "./charts/RevenueChart";
import { WorldMap } from "./charts/WorldMap";
import { SalesDonutChart } from "./charts/SalesDonutChart";
import { TopSellingProducts } from "./tables/TopSellingProducts";
import { Link } from "react-router-dom";

const DefaultScreen: React.FC = () => {
  const dashboardData = useAppSelector((state) => state.dashboard.data);

  const stats = [
    {
      title: "Customers",
      value: dashboardData.customers.count.toLocaleString(),
      change: dashboardData.customers.change,
      trend: dashboardData.customers.trend,
      href : "/dashboards/ecommerce/customers"
    },
    {
      title: "Orders",
      value: dashboardData.orders.count.toLocaleString(),
      change: dashboardData.orders.change,
      trend: dashboardData.orders.trend,
      href : "/dashboards/ecommerce/orders"
    },
    {
      title: "Revenue",
      value: `$${dashboardData.revenue.amount}`,
      change: dashboardData.revenue.change,
      trend: dashboardData.revenue.trend,
      href : "/dashboards/ecommerce/revenue"
    },
    {
      title: "Growth",
      value: `${dashboardData.growth.percentage}%`,
      change: dashboardData.growth.change,
      trend: dashboardData.growth.trend,
      href : "/dashboards/ecommerce/growth"
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">eCommerce</h1>
      <div className="flex flex-col xl:flex-row gap-7 w-full">
        {/* Stats Cards */}
        <div className="xl:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-7">
          {stats.map((stat, index) => (
            <Link to={stat.href} key={stat.title}>
              <Card
                key={stat.title}
                className={cn(
                  "relative overflow-hidden border-none shadow-none h-[112px] px-0 py-6 gap-2 cursor-pointer",
                  index === 0 && "bg-primary-blue text-[#1c1c1c]",
                  (index === 1 || index === 2) &&
                    "bg-primary-light dark:bg-primary-light/15",
                  index === 3 && "bg-primary-purple text-[#1c1c1c]"
                )}
              >
                <CardHeader className="">
                  <CardTitle className="text-sm font-normal ">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <>
                        <span className="">+{stat.change}%</span>
                        <TrendingUp className="h-3 w-3 " />
                      </>
                    ) : (
                      <>
                        <span className="">{stat.change}%</span>
                        <TrendingDown className="h-3 w-3" />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <ProjectionsChart />
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <RevenueChart />
        </div>
        <div className="space-y-6">
          <WorldMap />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <TopSellingProducts />
        </div>
        <SalesDonutChart />
      </div>
    </div>
  );
};

export default DefaultScreen;
