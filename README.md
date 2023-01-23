TODO: export different environment variables that can be used by the other script


## Usage
```bash
npx ts-node index.ts "<command>"
```

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