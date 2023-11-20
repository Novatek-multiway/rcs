FROM node:16.15.0 as base
WORKDIR /source
# ENV NODE_OPTIONS="--max-old-space-size=8192"
# ARG APP=main
# init
RUN npm install turbo@1.10.6 -g
RUN npm install pnpm -g
RUN pnpm config set registry https://registry.npmmirror.com
COPY . .
# https://turbo.build/repo/docs/reference/command-line-reference/prune
# RUN turbo prune --scope=$APP --docker
# RUN turbo prune $(echo $APP | tr ',' ' --scope=' | sed -e 's/^/--scope=/') --docker
# RUN turbo prune --scope=$APP --docker
RUN turbo prune --scope=main --scope=micro-dashboard --scope=micro-data-management --docker



FROM base as builder
WORKDIR /source
ARG APP=main
# ADD package.json /source
# install 
COPY .gitignore .gitignore
COPY --from=base /source/out/json/ .
COPY --from=base /source/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /source/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install
# build app
COPY --from=base /source/out/full/ .
COPY turbo.json turbo.json
# RUN pnpm build --filter=$APP
RUN pnpm build

COPY . /source


# nginx
FROM cym1102/nginxwebui:latest
# ARG APP=main
# COPY --from=builder /source/apps/${APP}/dist/ /usr/share/nginx/html/${APP}/
COPY --from=builder /source/apps/main/dist/ /usr/share/nginx/html/main/
COPY --from=builder /source/apps/micro-dashboard/dist/ /usr/share/nginx/html/micro-dashboard/
COPY --from=builder /source/apps/micro-data-management/dist/ /usr/share/nginx/html/micro-data-management/
# COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./default.conf /home/nginxWebUI/nginx.conf
