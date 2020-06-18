import * as Types from '../actionTypes';


export const add = (n) => {
  return {
    type: Types.COUNT_ADD,
    n
  }
}
