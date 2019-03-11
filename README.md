# tslint-auto-fix

Watches your files for changes, runs them through TSLint's fix function, then overwrites them if they have been fixed.

Uses your existing TSLint configuration.

It's good for productivity, helping your team conform to whatever TS style guide you choose without worrying about text editor plugins or additional setup. Heck, you could have different projects using totally different style guides, and your developers won't care whether they have to write semicolons or not.

## Installation

```bash
npm i --save-dev tslint-auto-fix
```

## Usage

```bash
npx tslint-auto-fix
```

Or add it to your package.json

```json
{
  "scripts": {
    "fix-ts": "tslint-auto-fix"
  }
}
```

## Command Line Options

`--help` to show the help message

`--project` to specify your Typescript configuration. Defaults to `tsconfig.json`.

`--verbose` to report whenever a file is changed.

`--format` to specify which TSLint format to use. Defaults to `prose`, which is probably what you want.

`[globs-to-watch]` are all the file globs you want tslint-auto-fix to watch. You can pass multiple globs.

Example:

```bash
npx tslint-auto-fix "src/**/*.ts" "cli.ts" "bin/*.ts"
```

## Quote 'em!

Because your shell loves to expand `*` characters, you'll probably want to put these in quotes. Otherwise it'll feed a limited number of file paths to tslint-auto-fix, and should you add new files that would match that initial glob, they won't be fixed.

Example:

```bash
npx tslint-auto-fix "lib/*.ts"
```

The above will probably do what you want. If a new file is added in the `lib` folder, tslint-auto-fix will watch it and fix it automatically without requiring you to restart the process.

However:

```bash
npx tslint-auto-fix lib/*.ts
```

Without the quotes this will only watch the `.ts` files that are present in the `lib` folder at the time this process starts.

## Defaults

If you don't provide the file globs to watch, it will watch all files in your project ending in `.ts` and `.tsx`.

## Peer Dependency

This module has a peer dependency on TSLint. If you don't already have that installed in your project, add it to your "devDependencies" in package.json. If anything weird is going on, check the version requirements and let me know.

## Limitations

What can be fixed is limited by what TSLint can fix.
