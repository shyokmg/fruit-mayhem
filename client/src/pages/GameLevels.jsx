import React, { useState } from "react";
import { Flex, Card, Row, Col, Button } from "antd";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import LevelCards from "../components/UserInterface/LevelCards";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

const GameLevels = () => {
  const { loading, data } = useQuery(GET_ME);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    navigate("/");
  }

  const userData = data?.me.playerData || {};

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/");
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div style={{ margin: "160px" }}>
      <Flex justify="center" align="center" gap="middle" vertical>
        <Button onClick={handleBackButton} className="ingame-button" type="link" style={{ position: 'absolute', top: '85px', left: '220px', zIndex: 1 }}> BACK</Button>
        <h1 className="ingame-text"  style={{ position: 'absolute', top: '85px', left: '620px', zIndex: 1 }}> LEVELS </h1>
        <Row gutter={[16, 32]}>
          {userData.map((levels) => (
            <Col span={8}>
              <LevelCards 
                key={levels.level}
                level={levels.level}
                highscore={levels.highScore}
                isUnlocked={levels.unlocked}
              />
            </Col>
          ))}
        </Row>
      </Flex>
    </div>
  );
};

export default GameLevels;
