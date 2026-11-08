# My Plugin

An [Obsidian](https://obsidian.md) plugin.

## Using this template

1. Create a new repository from this template.
2. Replace the placeholders:
   - `package.json`: `name`, `description`, `author`
   - `manifest.json`: `id`, `name`, `description`, `author`
   - `eslint.config.js`: the `brands` list under `obsidianmd/ui/sentence-case`
   - `main.ts`: the class name. It holds only lifecycle methods; everything else is started from `src/runtime.ts`.
   - `LICENSE`: the holder
   - `.coverage/baseline.json` stays at zero until the first real coverage run; then raise it by hand.
3. Reset `versions.json` to the plugin's first version and `minAppVersion`.
4. Fill in `docs/TESTING.md` as load-bearing behaviors appear.

## Development

Requires Node 24 or later and [pnpm](https://pnpm.io).

```
pnpm install
pnpm dev            # rebuild on change
pnpm dev:mobile     # same, with mobile emulation
pnpm test
pnpm test:ratchet   # coverage, then the floor check
pnpm lint
pnpm typecheck
pnpm build          # typecheck, then a production build into dist/
```

Builds land in `dist/`. Symlink a dev vault's plugin folder to it:

```
ln -s "$(pwd)/dist" "<vault>/.obsidian/plugins/<plugin-id>"
```

## Adding React

The base template has no React. To add it:

1. `pnpm add react react-dom` and `pnpm add -D @types/react @types/react-dom @testing-library/react`
2. In `tsconfig.json`, add `"jsx": "react-jsx"`, extend `types` with `"react"` and `"react-dom"`, and change `include` to `["**/*.ts", "**/*.tsx"]`.

`esbuild.config.js`, `eslint.config.js` and `vitest.config.js` already handle `.tsx`.

## Workflows

- `ci.yaml` runs typecheck, lint, tests with coverage, the coverage ratchet and a build on every pull request. Branch-protect `main` so every change goes through it.
- `release.yaml` runs when a GitHub Release is published. The tag must be the bare version and match `manifest.json`. It builds, attests and uploads `main.js`, `manifest.json` and `styles.css`.

## Conventions

- [Code style](docs/Code_Style_Guide.md)
- [Testing philosophy](docs/LVNACY_Testing_Philosophy.md)
- [This project's testing notes](docs/TESTING.md)

## License

[MIT](LICENSE)
