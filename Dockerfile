
FROM oven/bun:debian AS debian-with-bun



FROM debian-with-bun AS dev-node-modules
ARG TARGET=/tmp/docker-build/dev-node-modules/
RUN mkdir -p $TARGET
COPY package.json $TARGET
RUN cd $TARGET && bun install --frozen-lockfile

FROM debian-with-bun AS prod-node-modules
ARG TARGET=/tmp/docker-build/prod-node-modules/
RUN mkdir -p $TARGET
COPY package.json $TARGET
RUN cd $TARGET && bun install --frozen-lockfile --production



FROM debian-with-bun AS unbuilt-project
ARG TARGET=/tmp/docker-build/unbuilt-project/
RUN mkdir -p $TARGET
WORKDIR $TARGET
COPY src/ src/
COPY public/ public/
COPY package.json README.md .

FROM debian-with-bun AS built-project
ARG TARGET=/tmp/docker-build/built-project/
RUN mkdir -p $TARGET
WORKDIR $TARGET
COPY --from=dev-node-modules /tmp/docker-build/dev-node-modules/node_modules/ node_modules/
COPY --from=unbuilt-project /tmp/docker-build/unbuilt-project/ .
RUN bun run build

# Be careful to have the Node modules correctly built and copied in, because
# `bun run build` appears to have a bug where if dependencies are missing it
# uses npm rather bun to install them, and Bun's Docker images do not have
# npm installed.



FROM debian-with-bun AS unexecutable-image
WORKDIR /usr/src/app
COPY --from=prod-node-modules /tmp/docker-build/prod-node-modules/node_modules/ node_modules/
COPY --from=built-project --exclude=node_modules /tmp/docker-build/built-project/ .

# Or do we want to simply copy the .next directory,
# as ostensibly only that's what `next start` needs?

FROM unexecutable-image AS executable-image
EXPOSE 3000/tcp
USER bun
CMD ["bun", "run", "start"]
