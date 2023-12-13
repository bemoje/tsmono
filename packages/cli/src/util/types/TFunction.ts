import type { Any } from './Any'
import type { TConstructor } from './TConstructor'
import type { TFunctionNoNew } from './TFunctionNoNew'

export type TFunction<R = Any, A extends Any[] = Any[]> = TConstructor<R, A> | TFunctionNoNew<R, A>
