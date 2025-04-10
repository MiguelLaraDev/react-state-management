import classNames from "classnames";
import type { Availability } from "../../interfaces/shared.types";
import { availabilityConfig } from "../../utils/configs";

interface AvailabilityBadgeProps {
  status: Availability;
  className?: string;
}

const AvailabilityBadge = ({ status, className }: AvailabilityBadgeProps) => {
  return (
    <p className={classNames("text-xs md:text-base", availabilityConfig[status].color, className)}>
      {availabilityConfig[status].label}
    </p>
  );
};

export default AvailabilityBadge;
