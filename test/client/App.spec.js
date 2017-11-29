import React from 'react';
import App from '../../src/client/components/App';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { initialState as page } from '../../src/client/ducks/page/reducers'
import { initialState as view } from '../../src/client/ducks/view/reducers'
import { initialState as config } from '../../src/client/ducks/config/reducers'

configure({ adapter: new Adapter() });

describe('<App/>', () => {
  it('renders correctly without crashing', () => {
    const dispatch = jest.fn()

    const props = {
      page,
      view,
      config,
      dispatch
    }
    mount(<App {...props}/>);
  })
})
