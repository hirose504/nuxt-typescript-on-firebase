import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Todo } from '~/types'
import { $axios } from '~/utils/api'

@Module({ name: 'todos', stateFactory: true, namespaced: true })
export default class TodosModule extends VuexModule {
  list: Todo[] = []

  @Mutation
  setList(list: Todo[]) {
    this.list = list
  }

  @Mutation
  remove(todo: Todo) {
    this.list.splice(this.list.indexOf(todo), 1)
  }

  @Action
  async fetch() {
    const list = await $axios.$get<Todo[]>('/api/todos')
    this.setList(list)
  }

  @Action
  async add(text: string) {
    const list = await $axios.$post<Todo[]>('/api/todos', { text })
    this.setList(list)
  }

  @Action
  async toggle(todo: Todo) {
    const list = await $axios.$post<Todo[]>(`/api/todos/${todo.id}`, {
      text: todo.text,
      done: !todo.done
    })
    this.setList(list)
  }
}
