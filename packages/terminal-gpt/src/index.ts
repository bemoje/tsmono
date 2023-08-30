import { strRepeat } from '@bemoje/string'
import { blue, cyan, red, yellow } from 'cli-color'
import { Command } from 'commander'
import { addPreset } from './core/actions/addPreset'
import { onCustomPreset } from './core/actions/onCustomPreset'
import { removePreset } from './core/actions/removePreset'
import { config } from './core/config'
import { emails } from './core/emails/emails'
import { presets } from './core/presets/presets'

/**
 * The main function of the application.
 * It sets up the command-line interface and handles command execution.
 */
export async function main() {
  const line = (cmd: string, info: string) => '  ' + cmd + strRepeat(' ', Math.max(0, 35 - cmd.length)) + blue(info)

  const program = new Command()
    .name('gpt')
    .description(
      [
        'Important settings:',
        line('gpt config set apiKey YOUR_KEY', 'set your OpenAI API key'),
        line('gpt config set editor "code -w"', 'set your text editor to be VSCode.'),
        line('gpt config set default_preferGpt4 false', 'whether to use gpt4 when possible.'),
        '',
        'Set these, too:',
        line('default_terminalOutput', 'whether to output responses in the terminal'),
        line('default_openResponseIn', 'where to open responses (default: chrome)'),
        '',
        'Usage examples:',
        line('gpt help config', "display help for the 'config' command"),
        line('gpt config edit', 'edit all settings in your text-editor as JSON'),
        line('gpt q how far is the moon?', "use the 'q' preset to prompt ChatGPT with its default behaviour"),
        line('gpt tsdocf some/file/path.ts', "use the 'tsdocf' preset to generate TypeScript documentation for a file"),
        line('gpt preset add myPreset', "add a new preset named 'myPreset'"),
        line('gpt help q', "display help for the 'q' preset"),
      ].join('\n'),
    )
    .version('0.0.0')

  // Create CLI command for each preset defined in user settings
  for (const [preset, settings] of Object.entries({
    ...(config.appdata.user.get('presets_examples') || {}),
    ...(config.appdata.user.get('presets') || {}),
  })) {
    program
      .command(preset)
      .description(red(settings['description']))
      .argument(
        '[options]',
        [
          'enter ´reply´ to reply to the last response received from ChatGPT.',
          'enter ´improve´ to ask ChatGPT to improve its last response.',
          'enter ´edit´ to open and edit your last prompt.',
          'enter ´16k´ to use a 16k token model regardless of other settings.',
        ].join('\n'),
      )
      .argument('[prompt...]', 'Optional prompt. Omit to edit in your text-editor.', '')
      .action(async (opts: string[], prompt: string[]) => {
        const [_prompt, is16k, isReply, isEdit] = await onCustomPreset(opts, prompt)
        await presets(preset, _prompt, is16k, isReply, isEdit)
      })
  }

  // Create CLI command for the emails feature.
  program
    .command('emails')
    .description(yellow('Summarize Microsoft Outlook email thread. Simply copy and paste the contents.'))
    .action(async () => {
      await emails()
    })

  // set up CLI commands for adding and removing presets
  program
    .command('preset')
    .description(cyan('Remove or add a new preset in the config file.'))
    .argument('<action>', "Action to perform on a preset. Can be 'add' and 'remove'.")
    .argument('<name>', 'The name of the preset.')
    .action(async (action: string, name: string) => {
      if (action === 'add') {
        await addPreset(name)
      } else if (action === 'remove') {
        await removePreset(name)
      }
    })

  config.initialize(program)

  program.parse()
}

main().catch(console.error)
