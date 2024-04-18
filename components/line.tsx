"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ColorType, createChart, LineData } from "lightweight-charts";
import { getSMAPoints } from "@/services/service";
import { formatSMAPoints, SMAData } from "@/lib/formatter";

const LineGraph = ({ symbol }: { symbol: string }) => {
  const [smaData, setSmaData] = useState<SMAData | undefined>(undefined);
  const chartContinerRef = useRef(null);

  useEffect(() => {
    getSMAPoints(symbol)
      .then((data) => {
        setSmaData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [symbol]);

  const smaPoints = useMemo(() => formatSMAPoints(smaData), [smaData]);

  useEffect(() => {
    if (chartContinerRef.current === null) return;
    const chart = createChart(chartContinerRef?.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
      },
      width: window.innerWidth - 500,
      height: 500,
    });

    const smaSeries = chart.addLineSeries();
    smaSeries.applyOptions({
      color: "#FFA500",
      lineWidth: 2,
    });
    if (smaPoints) {
      smaSeries.setData(smaPoints);
    }

    chart.priceScale("left").applyOptions({
      borderColor: "#71649C",
      visible: true,
    });
    chart.timeScale().applyOptions({
      rightOffset: 12,
    });

    const handleResize = () => {
      chart.applyOptions({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [smaPoints]);

  return <div ref={chartContinerRef}></div>;
};

export default LineGraph;
