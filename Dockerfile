#
# ---- Base Node ----
FROM node:4.2 AS base

RUN mkdir -p /opt/app

# set working directory
WORKDIR /opt/app

COPY . /opt/app

#
# ---- Dependencies ----
FROM base AS dependencies

WORKDIR /opt/app/


# First install production only node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production

# copy production node_modules aside
RUN cp -R node_modules prod_node_modules


RUN npm install


#
# ---- Release ----
FROM base AS release

# set working directory
WORKDIR /opt/app

# Copy production node_modules
COPY --from=dependencies /opt/app/prod_node_modules /opt/app/node_modules


EXPOSE 4000
CMD ["node", "/opt/app/server.js"]