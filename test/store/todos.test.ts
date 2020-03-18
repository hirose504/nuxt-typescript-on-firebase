import MockAdapter from 'axios-mock-adapter'
import { createStore } from '~/.nuxt/store'
import { initialiseStores, todosStore } from '~/utils/store-accessor'
import { $axios } from '~/utils/api'

jest.mock('~/utils/api')

const mock = new MockAdapter($axios)

describe('TodosModule', () => {
  beforeEach(() => {
    initialiseStores(createStore())
  })

  test('init', () => {
    expect(todosStore.list).toEqual([])
  })

  test('fetch ', async () => {
    mock.onGet('/api/todos').reply(200, [{ id: 1, text: 'test', done: false }])
    await todosStore.fetch()
    expect(todosStore.list).toEqual([{ id: 1, text: 'test', done: false }])
  })

  test('add', async () => {
    mock.onPost('/api/todos').reply(200, [{ id: 1, text: 'test', done: false }])
    await todosStore.add('test')
    expect(todosStore.list).toEqual([{ id: 1, text: 'test', done: false }])
  })

  test('toggle', async () => {
    mock.onGet('/api/todos').reply(200, [
      { id: 1, text: 'aaaa', done: false },
      { id: 2, text: 'bbbb', done: false },
      { id: 3, text: 'cccc', done: false }
    ])
    mock.onPost('/api/todos/2').reply(200, [
      { id: 1, text: 'aaaa', done: false },
      { id: 2, text: 'bbbb', done: true },
      { id: 3, text: 'cccc', done: false }
    ])
    await todosStore.fetch()
    await todosStore.toggle(todosStore.list[1])
    expect(todosStore.list).toEqual([
      { id: 1, text: 'aaaa', done: false },
      { id: 2, text: 'bbbb', done: true },
      { id: 3, text: 'cccc', done: false }
    ])
  })
})
