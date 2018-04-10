import React from 'react';
import { storiesOf } from '@storybook/react';

import TopBanner from '../src/client/components/TopBanner'

storiesOf('TopBanner', module)
  .add('basic', () => (
    <TopBanner/>
  ))