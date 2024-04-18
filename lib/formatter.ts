import { LineData } from "lightweight-charts";

export interface SMADataVal {
  SMA: string;
}

export interface SMATechnicalAnalysis {
  [date: string]: SMADataVal;
}
export interface SMAData {
  "Meta Data": IndicatorMetaData;
  "Technical Analysis: SMA": SMATechnicalAnalysis;
}

export interface IndicatorMetaData {
  "1: Symbol": string;
  "2: Indicator": string;
  "3: Last Refreshed": string;
  "4: Interval": string;
  "5: Time Period": number;
  "6: Series Type"?: string;
  "7: Time Zone": string;
}

export const formatSMAPoints = (
  smaData: SMAData | undefined
): LineData<string>[] => {
  const formattedSMAPoints: LineData<string>[] = [];

  if (smaData && smaData["Technical Analysis: SMA"]) {
    Object.entries(smaData["Technical Analysis: SMA"]).forEach(
      ([key, value]) => {
        const time: string = key; // Use the date string as the time
        formattedSMAPoints.push({
          time,
          value: parseFloat(value.SMA),
        });
      }
    );
  }

  formattedSMAPoints.sort((a, b) => a.time.localeCompare(b.time));

  return formattedSMAPoints;
};
