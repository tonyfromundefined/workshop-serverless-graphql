import { extendType, idArg } from 'nexus'
import { TASKS } from './'

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
