import Client, { connect } from "@dagger.io/dagger";
import { withNix } from "./step.ts";

connect(async (client: Client) => {
  const ctr = withNix(
    client
      .pipeline("nix-installer")
      .container()
      .from("alpine")
      .withExec(["apk", "add", "curl"])
  );

  const result = await ctr.stdout();

  console.log(result);
});
