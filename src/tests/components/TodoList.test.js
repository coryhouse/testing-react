import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../components/TodoList';

let wrapper;

beforeAll(() => {
  wrapper = shallow(<TodoList />);
});

test('should test TodoList component', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call handleAddTodo method', () => {
  const instance = wrapper.instance();
  const value = 'Publish Article';
  instance.handleAddTodo({
    preventDefault: () => {},
    target: {
      todo: {
        value
      }
    }
  });
});
