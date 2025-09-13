export type StockStatus = "in-stock" | "out-of-stock" | "pre-order";

interface StockIndicatorProps {
  status: StockStatus;
}

export function StockIndicator({ status }: StockIndicatorProps) {
  const statusConfig = {
    "in-stock": {
      label: "In Stock",
      color: "bg-green-400",
      textColor: "text-green-600",
    },
    "out-of-stock": {
      label: "Out of stock",
      color: "bg-red-400",
      textColor: "text-red-600",
    },
    "pre-order": {
      label: "Pre-order",
      color: "bg-[#C5AF71]",
      textColor: "text-[#C5AF71]",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-1">
      <div className={`h-2 w-2 rounded-full ${config.color}`} />
      <span className={`text-xs ${config.textColor}`}>{config.label}</span>
    </div>
  );
}