import { UPDATE_STATUS } from '../actions/types';

export default function(
  state = {
    turn: false,
    opponent: '',
    winner: '',
    line: [],
    gameFinished: false,
    lastMovePosition: -1
  },
  action
) {
  switch (action.type) {
    case UPDATE_STATUS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
