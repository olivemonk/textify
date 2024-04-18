import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DataCardProps {
    title: string;
    value: string;
    percentage: string;
    icon: LucideIcon
}


const DataCard = ({title, value, percentage, icon}:DataCardProps) => {

    const Icon = icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{percentage}% from last month</p>
      </CardContent>
    </Card>
  );
};

export default DataCard;
