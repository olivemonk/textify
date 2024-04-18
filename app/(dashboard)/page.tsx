"use client";

import DataCard from "@/components/data-card";
import LineGraph from "@/components/line";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getTickerName, getTikcerDetails } from "@/services/service";
import {
  AreaChart,
  DollarSign,
  LineChart,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

type Stock = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
};

const DashboardPage = () => {
  const [keyword, setKeyword] = useState<string>("IBM");
  const [symbol, setSymbol] = useState<string>("IBM");
  const [tickerDetails, setTickerDetails] = useState(undefined);
  const [data, setData] = useState<Stock[]>([]);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    if (keyword === "") return;
    const debounceFn = setTimeout(() => {
      getTickerName(keyword)
        .then((res) => {
          setData(res);
          console.log("call");
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [keyword]);

  useEffect(() => {
    if (data?.length > 0) {
      console.log("data", data);
    }
  }, [data]);

  useEffect(() => {
    if (symbol === "") return;
    getTikcerDetails(symbol)
      .then((res) => {
        setTickerDetails(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [symbol]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-y-2">
        <h1 className="text-lg font-semibold md:text-2xl flex-1">Dashboard</h1>
        <form className=" sm:flex-initial">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search stock"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  className="pl-8 sm:w-full md:w-[300px] lg:w-[300px]"
                />
              </div>
            </PopoverTrigger>
            {data.length > 0 ? (
              <PopoverContent className="flex flex-col sm:w-full md:w-[300px] lg:w-[300px] p-1">
                {data?.map((stock, index) => (
                  <div
                    key={index}
                    className="hover:bg-muted py-1 px-2 rounded-sm text-black flex items-center gap-4 cursor-pointer justify-between"
                    onClick={() => {
                      setKeyword(stock.name);
                      setSymbol(stock.symbol);
                    }}
                  >
                    <p className="truncate w-4/5">{stock.name}</p>
                    <Badge className="bg-zinc-700 text-zinc-100 text-[8px]">
                      {stock.symbol}
                    </Badge>
                  </div>
                ))}
              </PopoverContent>
            ) : (
              <PopoverContent className="flex flex-col sm:w-full md:w-[300px] lg:w-[300px] p-1">
                <p className="text-muted-foreground text-center text-base">
                  No results found
                </p>
              </PopoverContent>
            )}
          </Popover>
        </form>
      </div>
      <Separator />
      {symbol && tickerDetails && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DataCard
            title="52 week high"
            icon={TrendingUp}
            value={tickerDetails["52WeekHigh"]}
            percentage="+23.4"
          />
          <DataCard
            title="52 week low"
            icon={TrendingDown}
            value={tickerDetails["52WeekLow"]}
            percentage="-4.2"
          />
          <DataCard
            title="EPS"
            icon={DollarSign}
            value={tickerDetails["EPS"]}
            percentage="+6.1"
          />
          <DataCard
            title="PE Ratio"
            icon={AreaChart}
            value={tickerDetails["PERatio"]}
            percentage="+2.7"
          />
        </div>
      )}
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <LineGraph symbol={symbol} />
      </div>
    </>
  );
};

export default DashboardPage;
