let runner = require('tslint/lib/runner')
let chokidar = require('chokidar')
let fs = require('fs')
let writingTo = {} // Paths we're currently writing fixed codez to

module.exports = (globsToWatch, options) => {
  let startupTime = new Date().getTime()

  if (!globsToWatch || !globsToWatch.length) {
    globsToWatch = ['./**/*.ts', './**/*.tsx']
  }

  if (!Array.isArray(globsToWatch)) {
    globsToWatch = [globsToWatch]
  }

  if (options.verbose) {
    console.error(`eslint-auto-fix is watching ${globsToWatch.join(', ')} for file changes`)
  }

  chokidar.watch(globsToWatch)
    .on('change', fix(options.verbose, options.project))
    .on('add', path => {
      // When chokidar first starts watching, it emits an "add" event for each file
      // it finds matching the glob. Fixing them all at that point might be undesirable.
      fs.stat(path, (error, stats) => {
        if (stats && startupTime < stats.birthtimeMs) {
          fix(options.verbose, options.project)(path)
        }
      })
    })
}

let errorMessages = (fatalErrorResults, path) => {
  fatalErrorResults.forEach(result => {
    result.messages.forEach(({message, line, column}) => {
      console.error(`${message} on line ${line}, column ${column} of ${path}`)
    })
  })
}

let fatalErrors = results => results.filter(
  result => Boolean(result.messages.filter(
    message => message.fatal
  ).length)
)

let fix = options => path => {
  if (writingTo[path] === undefined) {
    if (options.verbose) {
      console.error(`${path} changed`)
    }

    writingTo[path] = true
    runner.run({
      config: undefined,
      exclude: ['node_modules', 'bower_components'],
      files: [path],
      fix: true,
      force: undefined,
      format: options.format || 'prose',
      formattersDirectory: undefined,
      init: undefined,
      out: undefined,
      outputAbsolutePaths: undefined,
      project: options.project || 'tsconfig.json',
      rulesDirectory: undefined,
      test: undefined,
      typeCheck: undefined,
    }, {
      error: console.error,
      log: console.log,
    })
    .catch(function (e) {
      console.error(e);
    })
    .then(() => {
      delete writingTo[path]
    })
  }
}
