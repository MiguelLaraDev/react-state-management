import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ScoreProps {
  score: number;
}

const Score = ({ score }: ScoreProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const icon = i <= score ? faStar : faStarOutline;

        return <FontAwesomeIcon key={`score-${i}`} icon={icon} className="text-xs md:text-base" />;
      })}
    </div>
  );
};

export default Score;
