import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { Card } from '../components/Card/Card';
import { MouseTrackerCard } from '../components/MouseTrackerCard/MouseTrackerCard';

import {setObservableConfig} from 'recompose';
import rxjsConfig from 'recompose/rxjsObservableConfig';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('MouseTracker', module)
  .add('standard', () => <MouseTrackerCard />);

storiesOf('Toggle Card', module)
  .add('standard', () => <Card><p>Is this hidden? 😎 </p></Card>);