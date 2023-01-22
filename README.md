TODO: tests

# Usage
AGG
MAX_COMMITS
REPO


## Recipes
These recepies use common command line tools to get interesting insights about your codebase.
If these tools are missing from your system you need to install them.

Count files in repo
```bash
npx ts-node index.ts "git ls-files | wc -l"
jq '.dependencies | length' package.json
jq '.dependencies + .devDependencies | length' package.json
```