import { extendType, idArg } from 'nexus'
import { prisma } from '~/generated/prisma'

export const TaskQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('task', {
      type: 'Task',
      args: {
        id: idArg({
          required: true,
        }),
      },
      resolve: async (_parent, args) => {
        const task = await prisma.task({
          id: args.id,
        })

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
        return prisma.tasks()
      },
    })
  },
})
