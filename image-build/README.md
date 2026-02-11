# Image Build

Dockerfiles and Cloud Build configurations for Scion container images.

## Image Hierarchy

```
core-base          System dependencies (Go, Node, Python)
  └── scion-base   Adds sciontool binary and scion user
        ├── claude     Claude Code harness
        ├── gemini     Gemini CLI harness
        ├── opencode   OpenCode harness
        └── codex      Codex harness
```

Each harness directory contains a `Dockerfile` that extends `scion-base` with harness-specific tooling.

## Cloud Build

- `cloudbuild.yaml` - Full rebuild of all layers.
- `cloudbuild-core-base.yaml` - Rebuild `core-base` only.
- `cloudbuild-scion-base.yaml` - Rebuild `scion-base` only.
- `cloudbuild-harnesses.yaml` - Rebuild all harness images only.
