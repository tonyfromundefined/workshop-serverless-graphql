import { extendType, idArg, objectType, stringArg } from 'nexus'
import short from 'short-uuid'

interface ITask {
  id: string
  content: string
  isDone: boolean
}

const TASKS: ITask[] = []

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.id('id', {
      description: 'Task 생성 시 자동 생성되는 Unique ID',
    })
    t.string('content', {
      description: 'Task 내용',
    })
    t.boolean('isDone', {
      description: 'Task 완료 여부',
    })
  },
})

export const TaskQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('task', {
      type: 'Task',
      args: {
        id: idArg(),
      },
      resolve: (_parent, args) => {
        const task = TASKS.find((task) => task.id === args.id)

        if (task) {
          return task

        } else {
          throw new Error(`${args.id}를 가진 Task를 찾을 수 없습니다`)
        }
      },
    })

    t.list.field('tasks', {
      type: 'Task',
      resolve: () => {
        return TASKS
      },
    })
  },
})

export const TaskMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTask', {
      type: 'Task',
      args: {
        content: stringArg({
          required: true,
        }),
      },
      resolve: (_parent, args) => {
        const task = {
          id: short.generate(),
          content: args.content,
          isDone: false,
        }

        TASKS.push(task)

        return task
      },
    })
  },
})
