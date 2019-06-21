import { booleanArg, extendType, idArg, stringArg } from 'nexus'
import { prisma } from '~/generated/prisma'

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
        return prisma.createTask({
          content: args.content,
          isDone: false,
        })
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
      resolve: (_parent, args) => {
        return prisma.updateTask({
          data: {
            content: args.content,
            isDone: args.isDone,
          },
          where: {
            id: args.id,
          },
        })
      },
    })

    t.field('deleteTask', {
      type: 'Task',
      args: {
        id: idArg({
          required: true,
        }),
      },
      resolve: (_parent, args) => {
        return prisma.deleteTask({
          id: args.id,
        })
      },
    })
  },
})
