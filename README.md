# Nix Pipeline

[![deno module](https://shield.deno.dev/x/nix_installer_pipeline)](https://deno.land/x/nix_installer_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/nix-installer-pipeline)](https://codecov.io/gh/fluent-ci-templates/nix-installer-pipeline)

A ready-to-use Nix pipeline for building projects with Nix.

## 🚀 Usage

Run the following command to setup a new project with this template:

```bash
fluentci init -t nix_installer
```

This will create a `.fluentci` folder in your project.

## Exported functions

| name         | description                                    |
| ------------ | ---------------------------------------------- |
| `withNix`    | Adds the Nix package manager to the container. |
| `withDevbox` | Adds the Devbox to the container.              |
| `withDevenv` | Adds the Devenv to the container.              |
| `withFlox`   | Adds the Flox to the container.                |

## Example

```typescript
import { Client, connect } from "https://sdk.fluentci.io/latest/mod.ts";
import { Dagger } from "https://deno.land/x/nix_installer_pipeline/mod.ts";

const { withDevbox } = Dagger;

connect(async (client: Client) => {
  // you can use withDevbox, withDevenv or withFlox
  const ctr = withDevbox(
    client
      .pipeline("nix-installer")
      .container()
      .from("alpine")
      .withExec(["apk", "add", "curl", "bash"]),
  );

  const result = await ctr.stdout();

  console.log(result);
});
```
