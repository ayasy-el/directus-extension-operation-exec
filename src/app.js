export default {
  id: "exec_cmd",
  name: "Exec",
  icon: "bolt",
  description: "Execute Command",
  overview: ({ cmd, wait, timeout }) => [
    {
      label: "Command",
      text: cmd,
    },
    {
      label: "Response Timing",
      text: wait
        ? "Wait until execution done"
        : `wait after ${timeout ?? 0} ms`,
    },
  ],
  options: [
    {
      field: "wait",
      name: "Wait until execution done",
      type: "boolean",
      meta: {
        width: "half",
        interface: "toggle",
      },
      schema: {
        default_value: false,
      },
    },
    {
      field: "timeout",
      name: "Timeout",
      type: "integer",
      schema: {
        is_nullable: false,
        default_value: 0,
      },
      meta: {
        width: "half",
        interface: "input",
        hidden: true,
        conditions: [
          {
            name: "show only if wait",
            rule: {
              wait: {
                _neq: true,
              },
            },
            hidden: false,
          },
        ],
      },
    },
    {
      field: "cmd",
      name: "Exec Command",
      type: "string",
      meta: {
        width: "full",
        interface: "input",
        required: true,
      },
    },
  ],
};
