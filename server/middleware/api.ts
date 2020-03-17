import { NuxtConfigurationServerMiddleware } from '@nuxt/types/config/server-middleware'
import express from 'express'
import { Todo } from '~/types'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const todos: Todo[] = []

app.get('/todos', (_req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  todos.push({
    id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
    text: req.body.text,
    done: false
  })
  res.json(todos)
})

app.post('/todos/:id(\\d+)', (req, res) => {
  const index = todos.map((todo) => todo.id).indexOf(parseInt(req.params.id))
  todos.splice(index, 1, {
    id: todos[index].id,
    text: req.body.text,
    done: req.body.done
  })
  res.json(todos)
})

app.get('/test', (_req, res) => {
  res.send('API server works fine')
})

export default {
  path: '/api',
  handler: app
} as NuxtConfigurationServerMiddleware
