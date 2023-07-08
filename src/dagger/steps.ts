import { Container } from "@dagger.io/dagger";

export const withNix = (ctr: Container) =>
  ctr
    .withExec([
      "sh",
      "-c",
      'curl --proto =https --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux --extra-conf "sandbox = false" --init none --no-confirm',
    ])
    .withEnvVariable("PATH", "${PATH}:/nix/var/nix/profiles/default/bin", {
      expand: true,
    })
    .withExec(["nix", "run", "nixpkgs#hello"]);

export const withDevbox = (ctr: Container) =>
  ctr
    .withEnvVariable("FORCE", "1")
    .withExec(["sh", "-c", "curl -fsSL https://get.jetpack.io/devbox | bash"])
    .withExec(["devbox", "version"]);

export const withDevenv = (ctr: Container) =>
  ctr
    .withEnvVariable("USER", "root")
    .withExec([
      "nix",
      "profile",
      "install",
      "--accept-flake-config",
      "github:cachix/cachix",
    ])
    .withExec([
      "sh",
      "-c",
      'echo "trusted-users = root $USER" | tee -a /etc/nix/nix.conf',
    ])
    .withExec(["cachix", "use", "devenv"])
    .withExec([
      "nix",
      "profile",
      "install",
      "--accept-flake-config",
      "github:cachix/devenv/latest",
    ])
    .withExec(["devenv", "version"]);

export const withFlox = (ctr: Container) =>
  ctr
    .withExec([
      "sh",
      "-c",
      "echo 'extra-trusted-substituters = https://cache.floxdev.com' | tee -a /etc/nix/nix.conf && echo 'extra-trusted-public-keys = flox-store-public-0:8c/B+kjIaQ+BloCmNkRUKwaVPFWkriSAd0JJvuDu4F0=' | tee -a /etc/nix/nix.conf",
    ])
    .withExec([
      "nix",
      "profile",
      "install",
      "--impure",
      "--experimental-features",
      "nix-command flakes auto-allocate-uids",
      "--accept-flake-config",
      "github:flox/floxpkgs#flox.fromCatalog",
    ])
    .withExec(["flox", "--version"]);
