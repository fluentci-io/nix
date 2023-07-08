import Client, { connect } from "@dagger.io/dagger";
import { withNix, withDevbox } from "./steps.ts";

connect(async (client: Client) => {
  const ctr = withDevbox(
    withNix(
      client
        .pipeline("nix-installer")
        .container()
        .from("alpine")
        .withExec(["apk", "add", "curl", "bash"])
    )
  );

  const result = await ctr.stdout();

  console.log(result);
});
