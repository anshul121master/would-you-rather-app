import { DATA_LOADED } from '../actions/loading';

export default function loading(state = true, action) {
  if (action.type === DATA_LOADED) {
    return action.loading;
  }
  return state;
}