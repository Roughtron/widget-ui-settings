import { schema } from 'normalizr'
import room from './room'

const rooms = new schema.Entity('rooms', {
  room,
  assignEntity: (output, key, value, input) => {
    if (!('submissions' in input) && !('submissions' in output)) {
      output.submissions = []
    }
    output[key] = value
  }
})

export default [rooms]
