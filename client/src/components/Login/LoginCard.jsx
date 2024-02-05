import React, { useState } from 'react';
import { Card } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

const AppLoginCard = () => {
  // set modal display state
//   const [showModal, setShowModal] = useState(false);
const tabList = [
    {
      key: 'tab1',
      tab: 'Login',
    },
    {
      key: 'tab2',
      tab: 'Signup',
    },
  ];

  const contentList = {
    tab1: <div><LoginForm /></div>,
    tab2: <div><SignUpForm /></div>,
  };

  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
 
  return (
    <>
      <Card 
        style={{
          width: '35%',
          margin: '100px',
        }}
        
        
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};

export default AppLoginCard;
