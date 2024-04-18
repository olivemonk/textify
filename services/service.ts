import { formatSMAPoints } from "@/lib/formatter";
import axios from "axios";

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

export const getTickerName = async (keyword: string) => {
  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      keywords: keyword,
      function: "SYMBOL_SEARCH",
      datatype: "json",
    },
    headers: {
      "X-RapidAPI-Key": "ca0726ebdbmshedb0237368f5d9fp186a8bjsneed38e882875",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const bestMatches = response.data.bestMatches;

    const stocks: Stock[] = bestMatches.map((match: any) => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
      type: match["3. type"],
      region: match["4. region"],
      marketOpen: match["5. marketOpen"],
      marketClose: match["6. marketClose"],
      timezone: match["7. timezone"],
      currency: match["8. currency"],
      matchScore: match["9. matchScore"],
    }));

    return stocks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTikcerDetails = async (symbol: string) => {
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=demo`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getSMAPoints = async (symbol: string) => {
  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      time_period: "60",
      interval: "daily",
      series_type: "close",
      function: "SMA",
      symbol: "MSFT",
      datatype: "json",
    },
    headers: {
      "X-RapidAPI-Key": "ca0726ebdbmshedb0237368f5d9fp186a8bjsneed38e882875",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("sma response", response.data);
    return response.data;

    // const formattedSMAPoints = formatSMAPoints(response.data);
    // console.log("formattedSMAPoints", formattedSMAPoints);
    // return formattedSMAPoints;
  } catch (error) {
    console.error(error);
    return {};
  }
};
