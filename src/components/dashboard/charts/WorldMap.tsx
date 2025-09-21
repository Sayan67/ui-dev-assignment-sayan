import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export const WorldMap: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { revenueByLocation } = useAppSelector((state) => state.dashboard.data);

  useEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    // Create polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      templateField: "polygonSettings",
      fillOpacity: 0.6,
      fill: am5.color(0x8b8b8b),
      strokeWidth: 0.5,
      stroke: am5.color(0x000000),
    });

    // Create point series for cities
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: 2,
        fill: am5.color(0x0ea5e9),
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
        tooltipText: "{name}: ${revenue}K",
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    // Add data points
    const points = revenueByLocation.map((location) => ({
      geometry: {
        type: "Point",
        coordinates: location.coordinates,
      },
      name: location.city,
      revenue: (location.revenue / 1000).toFixed(0),
    }));

    pointSeries.data.setAll(points);

    return () => {
      root.dispose();
    };
  }, [revenueByLocation]);

  return (
    <Card className="border-none h-full bg-primary-light dark:bg-primary-light/15 text-foreground shadow-none gap-3 w-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Revenue by Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[100px] w-full" />
        <div className="mt-4 space-y-5">
          {revenueByLocation.map((location) => (
            <div
              key={location.city}
              className="space-y-2"
            >
              <div
                className="flex justify-between items-center text-xs"
              >
                <span className="">{location.city}</span>
                <span className="">
                  {(location.revenue / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="w-full bg-secondary-cyan/15 h-0.5 rounded-full">
                <div
                  className="bg-secondary-cyan h-0.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      (location.revenue /
                        Math.max(
                          ...revenueByLocation.map((loc) => loc.revenue)
                        )) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
