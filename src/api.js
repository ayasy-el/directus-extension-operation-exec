import { exec } from "child_process";

export default {
  id: "exec_cmd",
  handler: ({ cmd, wait, timeout }) => {
    return new Promise((resolve, reject) => {
      let run = exec(cmd);
      let [log, resolved] = ["", false];

      const resolveAfterDelay = () => {
        if (!resolved) {
          resolved = true;
          setTimeout(() => {
            resolve({ log });
          }, timeout ?? 0);
        }
      };

      run.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
        log += data;
        if (!wait) resolveAfterDelay();
      });

      run.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
        log += data;
        if (!wait) resolveAfterDelay();
      });

      run.on("close", (code) => {
        console.log(`exec process exited with code ${code}`);
        log += `Exit code: ${code}`;
        resolve({ log });
      });

      run.on("error", (err) => {
        console.error(`Error: ${err}`);
        reject(err);
      });
    });
  },
};
