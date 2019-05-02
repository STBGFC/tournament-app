// https://docs.cypress.io/guides/guides/plugins-guide.html

module.exports = (on, config) => {
  
  /* eslint-disable no-unused-vars */
  on('before:browser:launch', (browser = {}, args) => {
    // remove the annoying --start-maximized arg to chrome
    let idx = args.indexOf('--start-maximized')
    if (idx > -1) {
      args.splice(idx, 1)
    }
    return args
  })

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js'
  })
}
