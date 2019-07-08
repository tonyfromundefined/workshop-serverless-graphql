import { prismaExtendType } from 'nexus-prisma'

export const TaskQueries = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.prismaFields(['task', 'tasks'])
  },
})
