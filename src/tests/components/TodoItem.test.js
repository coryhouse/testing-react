import React from 'react';
import { shallow } from 'enzyme';
import TodoItem from '../../components/TodoItem';

test('should test TodoItem component', () => {
  const wrapper = shallow(<TodoItem todo="Read Newspaper" />);
  expect(wrapper).toMatchSnapshot();
});
