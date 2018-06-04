import React from 'react';
import { compose } from 'recompose';

import { mouseTracker } from '../../hoc/MouseTracker/MouseTracker';

const cardStyle = {
    margin: '2em',
    width: '200px',
    height: '200px',
    border: '25px solid pink',
};

const enhance = compose(
    mouseTracker,
)

const Card = ({ x, y, onMouseMove }) => (
    <div style={cardStyle} onMouseMove={onMouseMove}>
        <h1>Your X, Y Locations</h1>
        <p>{x} {y}</p>
    </div>
);


export const MouseTrackerCard = enhance(Card);