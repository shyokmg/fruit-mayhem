import React, { useState } from "react";
import { Flex, Card, Row, Col, Button } from "antd";
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
    <div style={{ margin: "100px" }}>
      <Flex justify="center" align="center" gap="middle" vertical>
        <Button onClick={handleBackButton}>Back</Button>
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
