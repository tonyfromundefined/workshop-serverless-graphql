import { prismaExtendType } from 'nexus-prisma'

export const TaskMutations = prismaExtendType({
  type: 'Mutation',
  definition(t) {
    t.prismaFields([
      'createTask',
      'updateTask',
      'deleteTask',
    ])
  },
})
