# Git Spelunker

Visit different commits in a git repository and run a command on each of them.
Useful for gathering statistics about your codebase over time.

## Usage
```bash
npx ts-node index.ts "<command>"
```
Note: You probably want to wrap the command in quotes. If you don't all params will be concatenated, but the shell might expand them, pipes won't work, etc.

## Parameters
All parameters need to be passed as environment variables either exported in the shell or passed to the script.

AGG - Aggregation to make for the commits. Accepted values: day/month/year
MAX_COMMITS - Maximum number of commits to fetch. Default: 20000
REPO - Path to the git repository. Default: current directory


## Recipes
These recepies use common command line tools to get interesting insights about your codebase.
If these tools are missing from your system you need to install them.

Count files in repo
```bash
npx ts-node index.ts "git ls-files | wc -l"
npx ts-node index.ts "jq '.dependencies | length' package.json"
npx ts-node index.ts "jq '.dependencies + .devDependencies | length' package.json"
```

## Work log

TODO:2022/01/23 export different environment variables that can be used by the other script
TODO:2022/01/23 Test with significantly bigger repos