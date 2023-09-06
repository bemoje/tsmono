import { blue, cyan, red } from 'kleur'
import { Command } from 'commander'
import { config } from './config'
import { createPreset } from './actions/createPreset'
import { onCustomPreset } from './actions/onCustomPreset'
import { presets } from './presets/presets'
import { removePreset } from './actions/removePreset'
import { strRepeat } from '@bemoje/string'

export function program() {
  // initialize the command-line interface and handles command execution.
  const program = new Command().name('gpt').version('0.0.0')

  // general top-level help text for the program
  program.description(
    [
      'Mandatory settings:',
      line('gpt config set apiKey YOUR_KEY', 'set your OpenAI API key'),
      line('gpt config set editor "code -w"', 'set your preferred text editor to VSCode.'),
      '',
      'Useful settings',
      line('default_preferGpt4', 'whether to use gpt4 when possible.'),
      line('default_terminalOutput', 'whether to output responses in the terminal'),
      line('default_openResponseIn', 'where to open responses (default: chrome)'),
      '',
      'Usage examples:',
      line('gpt help config', "display help for the 'config' command"),
      line('gpt help q', "display help for the 'q' preset"),
      line('gpt config edit', 'edit all settings in your text-editor as JSON'),
      line('gpt q how far is the moon?', "use the 'q' preset to prompt ChatGPT with its default behaviour"),
      line('gpt preset create myPreset', "create a new preset named 'myPreset'"),
    ].join('\n')
  )

  // these options are available for all presets
  const universalCommandOptions = [
    'enter ´reply´ to reply to the last response received from ChatGPT.',
    'enter ´improve´ to ask ChatGPT to improve its last response.',
    'enter ´edit´ to open and edit your last prompt.',
    'enter ´16k´ to use a 16k token model overriding other settings.',
  ].join('\n')

  // create commands for using each preset defined in user settings.
  const examples = config.appdata.user.get('presets_examples') || {}
  const custom = config.appdata.user.get('presets') || {}
  for (const [preset, settings] of Object.entries({ ...examples, ...custom })) {
    program
      .command(preset)
      .description(red(settings['description']))
      .argument('[options]', universalCommandOptions)
      .argument('[prompt...]', 'Optional prompt. Omit to edit in your text-editor.', '')
      .action(async (opts: string[], prompt: string[]) => {
        const [_prompt, is16k, isReply, isEdit] = await onCustomPreset(opts, prompt)
        await presets(preset, _prompt, is16k, isReply, isEdit)
      })
  }

  // commands for managing presets
  program
    .command('preset')
    .description(cyan('Remove or create a new preset in the config file.'))
    .argument('<action>', "Action to perform on a preset. Can be 'create' and 'remove'.")
    .argument('<name>', 'The name of the preset.')
    .action(async (action: string, name: string) => {
      if (action === 'create') {
        await createPreset(name)
      } else if (action === 'remove') {
        await removePreset(name)
      }
    })

  // launch
  config.initialize(program)
  program.parse()
}

program()

function line(cmd: string, info: string) {
  return '  ' + cmd + strRepeat(' ', Math.max(0, 35 - cmd.length)) + blue(info)
}
