import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import { useNavigate } from "react-router-dom";
import { FaLock, FaLockOpen } from "react-icons/fa";

const LevelCards = ({ level, highscore, isUnlocked }) => {

  // set style for unlocked level card
  const gridStyle1 = {
    width: "90%",
    height: "100%",
    textAlign: "center",
  };

  // set style for locked level card
  const gridStyle2 = {
    width: "90%",
    height: "100%",
    textAlign: "center",
    backgroundColor: "#444140",
  };

  const navigate = useNavigate();
  const handleCardClick = () => {
    if (isUnlocked) {
      // go to game scene with value of selected level
      navigate(`/gamepage/${level}`);
    }
  };

  // render level cards
  return (
    <Card.Grid>
      {isUnlocked ? (
        <Card hoverable={true} style={gridStyle1} onClick={handleCardClick}>
          <Meta
            className="ingame-text"
            title={`Level:${level}`}
            description={`Highscore: ${highscore}`}
          />
          <FaLockOpen />
        </Card>
      ) : (
        <Card hoverable={false} style={gridStyle2} onClick={handleCardClick}>
          <Meta
            className="ingame-text"
            title={`Level: ${level}`}
            description={`Highscore: ${highscore}`}
          />
          <FaLock />
        </Card>
      )}
    </Card.Grid>
  );
};

export default LevelCards;
