import { exec } from "child_process";

export default {
  id: "exec_cmd",
  handler: async ({ cmd, wait, timeout }) => {
    try {
      const result = await new Promise((resolve, reject) => {
        let run = exec(cmd);
        let [log, resolved] = ["", false];

        const delayed = (callback) => {
          if (!resolved && !wait) {
            resolved = true;
            setTimeout(() => {
              callback();
            }, timeout ?? 0);
          }
        };

        run.stdout.on("data", (data) => {
          console.log(`stdout: ${data}`);
          log += data;
          delayed(() => {
            resolve({ log, status: "success" });
          });
        });

        run.stderr.on("data", (data) => {
          console.error(`stderr: ${data}`);
          log += data;
          delayed(() => {
            reject({ log, status: "error" });
          });
        });

        run.on("close", (code) => {
          console.log(`exec process exited with code ${code}`);
          log += `Exit code: ${code}`;
          if (code === 0) {
            resolve({ log, status: "success", exit_code: code });
          } else {
            reject({ log, status: "error", exit_code: code });
          }
        });

        run.on("error", (error) => {
          console.error(`Error: ${error}`);
          reject({ log, error, status: "error" });
        });
      });

      return result;
    } catch (response) {
      throw response;
    }
  },
};
