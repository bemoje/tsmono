import { createObjectMerger } from './createObjectMerger'

export const objAssign = createObjectMerger((value) => value != null)
