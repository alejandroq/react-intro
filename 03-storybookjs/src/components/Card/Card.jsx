import React from 'react';
import { compose, branch } from 'recompose';

import { openCloseStream } from '../../hoc/OpenCloseStream/OpenCloseStream';

const cardStyle = {
    margin: '2em',
    width: '200px',
    height: '200px',
    border: '25px solid pink',
};

const cardAltStyle = {
    margin: '2em',
    width: '200px',
    height: '200px',
    border: '25px solid red',
};

const pStyle = {
    color: 'red',
    cursor: 'pointer',
    textDecoration: 'underline',
};

const ShowMoreCard = ({ onClick }) => (
    <div style={cardStyle}>
        <p style={pStyle} onClick={onClick}>
            Show content
        </p>
    </div>
);

const HideMoreCard = ({ children, toggleVisibility }) => (
    <div style={cardAltStyle}>
        <p style={pStyle} onClick={toggleVisibility}>
            Hide content
        </p>
        {children}
    </div>
);

const isVisible = ({ visibility }) => visibility;

const enhance = compose(
    openCloseStream,
    branch(isVisible, HideMoreCard, ShowMoreCard),
)

export const Card = enhance();