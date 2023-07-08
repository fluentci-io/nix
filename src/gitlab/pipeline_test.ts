import { GitlabCI } from "fluent_gitlab_ci";
import pipeline, {
  installDevbox,
  installDevenv,
  installFlox,
  installNix,
} from "./pipeline.ts";
import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";

Deno.test(function pipelineTest() {
  const actual = pipeline.toString();
  const expected = Deno.readTextFileSync("fixtures/.gitlab-ci.yml");
  assertEquals(actual, expected);
});

Deno.test(function pipelineWithFloxTest() {
  const actual = new GitlabCI()
    .image("ubuntu:latest")
    .beforeScript(installNix.concat(installFlox))
    .toString();
  const expected = Deno.readTextFileSync("fixtures/.gitlab-ci-with-flox.yml");
  assertEquals(actual, expected);
});

Deno.test(function pipelineWithDevboxTest() {
  const actual = new GitlabCI()
    .image("ubuntu:latest")
    .beforeScript(installNix.concat(installDevbox))
    .toString();
  const expected = Deno.readTextFileSync("fixtures/.gitlab-ci-with-devbox.yml");
  assertEquals(actual, expected);
});

Deno.test(function pipelineWithDevenvTest() {
  const actual = new GitlabCI()
    .image("ubuntu:latest")
    .beforeScript(installNix.concat(installDevenv))
    .toString();
  const expected = Deno.readTextFileSync("fixtures/.gitlab-ci-with-devenv.yml");
  assertEquals(actual, expected);
});
