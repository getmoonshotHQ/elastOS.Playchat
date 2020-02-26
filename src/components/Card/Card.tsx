import React from 'react';

import './Card.css';

export const Card = ({ label, imageURL, active }: any) => {


  
  return (
    <div className="card_container" style={{ opacity: (active) ? 1 : 0.4, backgroundImage: `url(${imageURL})` }}>
      <div className="card_title"><b>{label}</b></div>
    </div>
  )
}