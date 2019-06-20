import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.string('stage', {
      resolve: () => {
        return process.env.STAGE as string
      },
    })
  },
})
