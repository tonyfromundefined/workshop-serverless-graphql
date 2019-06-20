import { mutationType } from 'nexus'

export const Mutation = mutationType({
  definition(t) {
    t.string('ping', {
      resolve: () => {
        return 'pong'
      },
    })
  },
})
