import { GitlabCI } from "fluent_gitlab_ci";

export const installNix = `
  apt update -y
  apt install curl -y
  curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux \
  --extra-conf "sandbox = false" \
  --init none \
  --no-confirm
  export PATH="\${PATH}:/nix/var/nix/profiles/default/bin"
  nix run nixpkgs#hello
`;

export const installDevbox = `
  FORCE=1 curl -fsSL https://get.jetpack.io/devbox | bash
`;

export const installDevenv = `
  nix profile install --accept-flake-config github:cachix/cachix
  USER=root echo "trusted-users = root $USER" | tee -a /etc/nix/nix.conf
  cachix use devenv
  nix profile install --accept-flake-config github:cachix/devenv/latest
`;

export const installFlox = `
  echo 'extra-trusted-substituters = https://cache.floxdev.com' | tee -a /etc/nix/nix.conf && echo 'extra-trusted-public-keys = flox-store-public-0:8c/B+kjIaQ+BloCmNkRUKwaVPFWkriSAd0JJvuDu4F0=' | tee -a /etc/nix/nix.conf
  nix profile install --impure \
  --experimental-features "nix-command flakes auto-allocate-uids" \
  --accept-flake-config 'github:flox/floxpkgs#flox.fromCatalog'
`;

const gitlabci = new GitlabCI().image("ubuntu:latest").beforeScript(installNix);

export default gitlabci;
