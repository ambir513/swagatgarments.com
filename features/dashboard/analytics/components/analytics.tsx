"use client";

import { AreaChartDemo } from "./area-chart";
import { BarChartDemo } from "./bar-chart";
import { PieChartDemo } from "./pie-chart";
import { StatsCard } from "./stats-card";

export const Analytics = () => {
  return (
    <main className="flex flex-col mt-5 md:mx-20 sm:mx-10 mx-5 ">
      <div className="flex lg:flex-row lg:mx-auto  flex-col justify-center items-center lg:gap-x-5 gap-y-5">
        <div className="flex flex-col gap-y-5 sm:w-fit w-full">
          <StatsCard />
          <PieChartDemo />
        </div>
        <BarChartDemo />
      </div>

      <AreaChartDemo />
    </main>
  );
};
