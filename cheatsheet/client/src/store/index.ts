import { Request, Response } from 'express-serve-static-core'
import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react-lite'
import { createContext, useContext } from 'react'

const isServer = typeof window === 'undefined'

let store: Store

useStaticRendering(isServer)

export interface IEnvironments {
  [key: string]: string | undefined
}

export function createStore(storeState?: Partial<Store>) {
  switch (true) {
    case isServer:
      return new Store(storeState)

    case typeof store !== 'undefined':
      return store

    default:
      return store = new Store(storeState)
  }
}

export class Store {
  @observable
  environments: IEnvironments

  constructor(storeState: Partial<Store> = {}) {
    this.environments = storeState.environments || {}
  }

  /**
   * Store Hydration
   * @param req Request
   * @param res Response
   */
  @action
  async nextServerInit(req: Request, res: Response) {
    if (!req || !res) {
      return
    }
  }
}

export const StoreContext = createContext({} as Store)
export const StoreProvider = StoreContext.Provider
export const useStore = () => useContext(StoreContext)
