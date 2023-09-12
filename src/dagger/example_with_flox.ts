import Client, { connect } from "@fluentci.io/dagger";
import { withFlox } from "./steps.ts";

connect(async (client: Client) => {
  const ctr = withFlox(
    client
      .pipeline("nix-installer")
      .container()
      .from("alpine")
      .withExec(["apk", "add", "curl"])
  );

  const result = await ctr.stdout();

  console.log(result);
});
