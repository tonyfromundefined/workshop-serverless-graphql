import { mutationType } from 'nexus'

export const Mutation = mutationType({
  definition(t) {
    t.string('ping', {
      resolve: (_parent, _args, _context) => {
        return 'pong'
      },
    })
  },
})
