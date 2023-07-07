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

const gitlabci = new GitlabCI().image("ubuntu:latest").beforeScript(installNix);

export default gitlabci;
