import Client, { connect } from "../../deps.ts";
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
