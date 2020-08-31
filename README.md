This repo is to demo the ASLS (AssemblyScript Language Server) usage with our app CLI:

1\. `shopify create script`

2\. Install [ASLS](https://github.com/saulecabrera/asls) and [VSCode extension](https://marketplace.visualstudio.com/items?itemName=saulecabrera.asls)

3\. Disable Typescript checking

```
# in .vscode/settings.json
{
  "typescript.validate.enable": false
}
```

4\. Add `asbuild` entry

```
# in package.json
  "scripts": {
    ...
    "asbuild": "npx --no-install shopify-scripts-build --src=./src/script.ts --binary=build/script.wasm -- --lib=./node_modules --optimize --use Date="
  }
```

5\. Open in VSCode and edit script with intended errors: `const a: f32 = 1.0 << 2`. You should see
ASLS working with red squiggles.
