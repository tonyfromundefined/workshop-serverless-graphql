import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.string('stage', {
      resolve: (_parent, _args, _context) => {
        return process.env.STAGE as string
      },
    })
  },
})
