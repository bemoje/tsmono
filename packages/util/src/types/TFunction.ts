import { Any } from './Any'
import { TConstructor } from './TConstructor'
import { TFunctionNoNew } from './TFunctionNoNew'

export type TFunction<R = Any, A extends Any[] = Any[]> = TConstructor<R, A> | TFunctionNoNew<R, A>
