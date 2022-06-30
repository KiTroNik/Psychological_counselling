FROM node:16.11-bullseye-slim

ARG FE_CMD

COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/tsconfig.json /frontend/
WORKDIR /frontend
RUN npm install --frozen-lockfile
COPY ./frontend/src /frontend/src
COPY ./frontend/public /frontend/public
COPY ./config/frontend /frontend/scripts
RUN ["chmod","+x","scripts/run.sh"]

CMD ["sh","-c","scripts/run.sh"]
