### START
`git clone https://github.com/solominh/electron-create-react-app.git app-name` <br>
`cd app-name`

In my experience, we should start React process and Electron process in 2 terminals
1. First terminal: `yarn react-start`
2. Second terminal: `yarn electron-start`


### PACKAGE
`yarn package:win`

1. With --no-prune => will work 100%
2. Without --no-prune => module not found everywhere => be careful

https://github.com/electron-userland/electron-packager
Be careful not to include node_modules you don't want into your final app. If you put them in the devDependencies section of package.json, by default none of the modules related to those dependencies will be copied in the app bundles. (This behavior can be turned off with the --no-prune flag.) In addition, folders like .git and node_modules/.bin will be ignored by default. You can use --ignore to ignore files and folders via a regular expression (not a glob pattern). Examples include --ignore=\.gitignore or --ignore="\.git(ignore|modules)".
