import { useLocalizationStore } from "@stores/locale.store";
import classNames from "classnames";
import type { Availability } from "../../interfaces/shared.types";

const colors = {
  available: "text-green-600",
  "few-left": "text-orange-600",
  "sold-out": "text-red-600",
};

interface AvailabilityBadgeProps {
  status: Availability;
  className?: string;
}

const AvailabilityBadge = ({ status, className }: AvailabilityBadgeProps) => {
  const { locale } = useLocalizationStore();
  const stock: Record<string, string> = locale.stock as Record<string, string>;
  const title = stock[status] || "n/a";

  return <p className={classNames("text-xs md:text-base", colors[status], className)}>{title}</p>;
};

export default AvailabilityBadge;
