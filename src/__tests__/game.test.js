import { mount } from '@vue/test-utils'
import Game from '../components/Game.vue'

test('renders a todo', () => {
  const wrapper = mount(Game)

  const todo = wrapper.get('[data-test="todo"]')

  expect(todo.text()).toBe('Learn Vue.js 3')
})