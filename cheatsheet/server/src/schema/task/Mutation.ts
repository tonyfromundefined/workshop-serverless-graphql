import { booleanArg, extendType, idArg, stringArg } from 'nexus'
import short from 'short-uuid'
import { TASKS } from './'

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

    t.field('updateTask', {
      type: 'Task',
      args: {
        id: idArg({
          required: true,
        }),
        content: stringArg(),
        isDone: booleanArg(),
      },
      resolve: async (_parent, args) => {
        const taskIndex = TASKS.findIndex((task) => task.id === args.id)

        if (taskIndex) {
          if (args.content) {
            TASKS[taskIndex].content = args.content
          }
          if (args.isDone) {
            TASKS[taskIndex].isDone = args.isDone
          }

          return TASKS[taskIndex]

        } else {
          throw new Error(`${args.id}라는 ID를 가진 Task를 찾을 수 없습니다`)
        }
      },
    })

    t.field('deleteTask', {
      type: 'Task',
      args: {
        id: idArg({
          required: true,
        }),
      },
      resolve: async (_parent, args) => {
        const taskIndex = TASKS.findIndex((task) => task.id === args.id)

        if (taskIndex) {
          const task = TASKS[taskIndex]
          TASKS.splice(taskIndex, 1)

          return task

        } else {
          throw new Error(`${args.id}라는 ID를 가진 Task를 찾을 수 없습니다`)
        }
      },
    })
  },
})
