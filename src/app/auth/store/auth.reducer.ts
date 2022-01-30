import { User } from "../user.model";

export interface State {
  user: User;
}

const initalState: State = {
  user: null
};

export function authReducer(state = initalState, action) {
  return state;
}