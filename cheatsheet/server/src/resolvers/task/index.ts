import { prismaObjectType } from 'nexus-prisma'

export const Task = prismaObjectType({
  name: 'Task',
  definition(t) {
    t.prismaFields(['*'])

    // 또는 다음과 같이 원하는 필드만 노출할 수 있습니다.
    // t.prismaFields(['content', 'isDone'])
  },
})

export * from './Query'
export * from './Mutation'
