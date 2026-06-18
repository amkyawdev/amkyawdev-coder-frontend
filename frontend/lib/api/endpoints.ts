export const endpoints = {
  // Hugging Face API endpoints
  huggingface: {
    generate: "/huggingface",
    chat: "/huggingface",
    embeddings: "/huggingface/embeddings",
  },

  // Workspace endpoints
  workspace: {
    list: "/workspace",
    create: "/workspace",
    get: (id: string) => `/workspace/${id}`,
    update: (id: string) => `/workspace/${id}`,
    delete: (id: string) => `/workspace/${id}`,
  },

  // Project endpoints
  project: {
    list: "/project",
    create: "/project",
    get: (id: string) => `/project/${id}`,
    update: (id: string) => `/project/${id}`,
    delete: (id: string) => `/project/${id}`,
  },

  // Agent endpoints
  agent: {
    execute: "/agent/execute",
    status: (taskId: string) => `/agent/status/${taskId}`,
    cancel: (taskId: string) => `/agent/cancel/${taskId}`,
  },

  // Skill endpoints
  skill: {
    list: "/skill",
    execute: "/skill/execute",
    getResult: (taskId: string) => `/skill/result/${taskId}`,
  },

  // Deploy endpoints
  deploy: {
    list: "/deploy",
    create: "/deploy",
    getStatus: (id: string) => `/deploy/status/${id}`,
    logs: (id: string) => `/deploy/logs/${id}`,
  },
} as const;
