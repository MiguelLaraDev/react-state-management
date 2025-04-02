import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ScoreProps {
  score: number;
}

const Score = ({ score }: ScoreProps) => {
  return (
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map((i) => {
        const icon = i <= score ? faStar : faStarOutline;

        return <FontAwesomeIcon key={`score-${i}`} icon={icon} />;
      })}
      {/* TODO: Add amount of users which voted this score */}
    </div>
  );
};

export default Score;
