import Vuex from 'vuex'

import { initialState } from './initialState'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

export default () => {
  return new Vuex.Store({
    state: initialState,
    actions,
    mutations,
    getters,
    plugins: [createLogger()]
  })
}
