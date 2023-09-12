import Client, { connect } from "@fluentci.io/dagger";
import { withDevenv } from "./steps.ts";

connect(async (client: Client) => {
  const ctr = withDevenv(
    client
      .pipeline("nix-installer")
      .container()
      .from("alpine")
      .withExec(["apk", "add", "curl"])
  );

  const result = await ctr.stdout();

  console.log(result);
});
