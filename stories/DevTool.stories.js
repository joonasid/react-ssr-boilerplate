import React from 'react';

import { storiesOf } from '@storybook/react';

import DevTool from '../src/client/components/dev/DevTool'

storiesOf('DevTool', module)
  .add('mobile', () => (
    <DevTool view={{deviceType: 'mobile'}}>foo</DevTool>
  ))
  .add('tablet', () => (
    <DevTool view={{deviceType: 'tablet'}}>foo</DevTool>
  ))
  .add('desktop', () => (
    <DevTool view={{deviceType: 'desktop'}}>foo</DevTool>
  ))
