import Client, { connect } from "@dagger.io/dagger";
import { withDevboxExec, withPackageFromDevbox } from "./steps.ts";

connect(async (client: Client) => {
  const ctr = withDevboxExec(
    withPackageFromDevbox(
      client
        .pipeline("nix-installer")
        .container()
        .from("alpine")
        .withExec(["apk", "add", "curl", "bash"]),
      ["gh"],
    ),
    ["gh version"],
  );

  const result = await ctr.stdout();

  console.log(result);
});
