ARG BASE_IMAGE=ubuntu:22.04
FROM ${BASE_IMAGE}

RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install OpenCode
RUN curl -fsSL https://opencode.ai/install | bash

# Ensure opencode is in PATH if not already (install script usually handles it or puts in ~/.opencode/bin or /usr/local/bin)
# We might need to add it explicitly if it installs to user home.
# Assuming standard install to /usr/local/bin or similar for root, or we need to add to PATH.
# The snippet says: "$HOME/.opencode/bin - Default fallback".
# If running as root, it might be /root/.opencode/bin.
ENV PATH="/root/.opencode/bin:${PATH}"

ENTRYPOINT ["/bin/bash"]
