import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { assertThat, JsonObject, JsonValue } from '@bemoje/util'
import { createTypedListParser } from '../../parsers/createTypedListParser'
import { IConfigDefinePropertyOptions } from '../../types/IDefinePropertyOptions'
import { isString } from '../../validators/isString'
import { JsonFile } from './JsonFile'
import { JsonFileError } from './JsonFileError'
import { parseString } from '../../parsers/parseString'
import { TStringParser } from '../../types/TStringParser'
import { TValidator } from '../../types/TValidator'

/**
 * A class that represents the user-config section of the JSON file used as simple database.
 */
export class ConfigSection<Val extends JsonValue = JsonValue> extends AbstractJsonFileSection<Val> {
  readonly descriptions: Record<string, string> = {}
  readonly validators: Record<string, TValidator<Val>> = {}
  readonly parsers: Record<string, TStringParser<Val>> = {}

  constructor(file: JsonFile, name: string, hasFixedKeysForUser = true) {
    super(file, name, hasFixedKeysForUser)

    // if (file.cmd.isRoot) {
    //   this.defineProperty('editor', {
    //     description: 'application launch command for your preferred text editor.',
    //     defaultValue: defaultOpenInEditorCommand() as Val,
    //     parse: parseString,
    //   })
    // }

    if (file.cmd.features.isPresetsEnabled) {
      this.defineProperty('disabledBuiltinPresets', {
        description: 'Builtin presets that are disabled.',
        defaultValue: [] as Val,
        parse: createTypedListParser<Val>(',', parseString) as TStringParser<Val>,
        validate: function isArrayOfPresetNames(value: unknown) {
          if (!Array.isArray(value)) return false
          return value.every((name) => {
            return Object.hasOwn(file.presets.defaultValues, name)
          })
        },
      })
    }
  }

  override assertValid(key: string, value: Val) {
    if (!this.validators[key]) return
    assertThat(value, this.validators[key])
  }

  override defineProperty(key: string, options: IConfigDefinePropertyOptions<Val>) {
    const { description, defaultValue, parse, validate } = options
    this.defaultValues[key] = defaultValue
    this.parsers[key] = parse ?? parseString
    this.validators[key] = validate ?? isString
    this.descriptions[key] = description ?? ''
    this.assertValid(key, options.defaultValue)
  }

  override initialize(save = true) {
    if (this.isInitialized) return
    if (!this.file.cmd.features.isConfigEnabled) {
      throw new JsonFileError('ConfigSection.initialize() called when config is disabled')
    }
    const values = this.file.db.getSafe<typeof this.defaultValues>(this.prefix()) ?? this.defaultValues
    const config: JsonObject = {}
    for (const key of Object.keys(this.defaultValues)) {
      if (values[key] != null) {
        config[key] = values[key]
      } else {
        config[key] = this.defaultValues[key]
      }
    }
    this.file.db.set(this.prefix(), config, save)
    this.isInitialized = true
  }

  get keys() {
    return [...Object.keys(this.defaultValues)]
  }
}
