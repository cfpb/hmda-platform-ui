import { UPDATE_PROGRESS } from '../constants'
import {
  UPLOADING,
  PARSING,
  VALIDATING
} from '../constants/statusCodes.js'

const empty = { processed: 0, total: 0 }
const defaultProgress = {
  uploading: empty,
  parsing: empty,
  validating: empty
}

/*
 * Track progress for uploading, parsing, and validating
 */
export default (state = defaultProgress, action) => {
  switch (action.type) {
    case UPDATE_PROGRESS: {
      const validated = {
        processed: state.validating.total,
        total: state.validating.total
      }
      const parsed = {
        processed: state.parsing.total,
        total: state.parsing.total
      }
      const uploaded = {
        processed: state.uploading.total,
        total: state.uploading.total
      }
      const current = {
        processed: action.processed,
        total: action.total
      }

      const next = { ...defaultProgress }
      const code = action.status.code

      if(code === UPLOADING) next.uploading = current
      if(code > UPLOADING) next.uploading = uploaded

      if(code === PARSING) next.parsing = current
      if(code > PARSING) next.parsing = parsed

      if(code === VALIDATING) next.validating = current
      if(code > VALIDATING) next.validating = validated

      return next
    }
    default:
      return state
  }
}
