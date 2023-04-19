import React from 'react';
import { Button } from 'react-bootstrap';

function Bar(props) {
  const handleClick = (buttonName) => {
    // handle button click event
    console.log(`Button ${buttonName} was clicked!`);
  };

  return (
    <div className="button-bar">
      <Button onClick={() => handleClick('1')} className="custom-button">1 Day</Button>
      <Button onClick={() => handleClick('2')} className="custom-button">1 Hour</Button>
      <Button onClick={() => handleClick('3')} className="custom-button">30 Minutes</Button>
    </div>
  );
}

export default Bar;