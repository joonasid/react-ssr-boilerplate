import React from 'react';
import App from '../../src/client/components/App';

import { mount } from 'enzyme';

import { pageConstants } from '../../src/client/ducks/page/index'

describe('<App/>', () => {
  it('renders correctly without crashing', () => {
    const dispatch = jest.fn()
    const page = {
      page: pageConstants.PAGE_LANDING
    }
    const props = {
      config: {},
      page,
      dispatch
    }
    mount(<App {...props}/>);
  })
})
