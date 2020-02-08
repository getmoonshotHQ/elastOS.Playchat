import React, { useEffect, useCallback } from 'react';

import Game from '../game'

import './Game.css';

export const GamePage = ({ history }: any) => {

  useEffect(() => {
    new Game();
  }, []);

  return (
    <div id="game"></div>
  );
}