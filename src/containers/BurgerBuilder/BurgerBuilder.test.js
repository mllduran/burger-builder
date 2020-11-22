import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import { configure, shallow }from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder ings={{salad: 1}} onInitIngredients={() => {}}/>)
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    // TODO: NOT WORKING
    wrapper.setProps({
      ings: { salad: 1 }
    })

    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
});