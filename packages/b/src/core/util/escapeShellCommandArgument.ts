/**
 * Escape a string to be used as a shell command argument.
 * Wraps in double quotes only if necessary.
 */
export function escapeShellCommandArgument(command: string) {
  if (!/(["'$`\\ ])/.test(command)) return command
  return '"' + command.replace(/(["'$`\\])/g, '\\$1') + '"'
}

/*
console.log(escapeShellCommandArgument('21')) ///=> 21
console.log(escapeShellCommandArgument('noproblem')) ///=> noproblem
console.log(escapeShellCommandArgument('foo bar')) ///=> "foo bar"
console.log(escapeShellCommandArgument("'c:\\program files\\node'")) ///=> "\'c:\\program files\\node\'"
console.log(escapeShellCommandArgument('^(wow|hi)$')) ///=> "^(wow|hi)\$"
console.log(escapeShellCommandArgument('^(wow|hi)$')) ///=> "^(wow|hi)\$"
*/
