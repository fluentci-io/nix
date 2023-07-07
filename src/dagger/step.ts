import { Container } from "@dagger.io/dagger";

export const withNix = (ctr: Container) =>
  ctr
    .withExec([
      "sh",
      "-c",
      'curl --proto =https --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux --extra-conf "sandbox = false" --init none --no-confirm',
    ])
    .withEnvVariable("PATH", "${PATH}:/nix/var/nix/profiles/default/bin")
    .withExec(["nix", "run", "nixpkgs#hello"]);
