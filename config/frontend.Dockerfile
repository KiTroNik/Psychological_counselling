FROM node:16.11-bullseye-slim

ARG FE_CMD

COPY ./frontend/.babelrc ./frontend/.postcssrc ./frontend/tailwind.config.js ./frontend/package.json ./frontend/yarn.lock ./frontend/tsconfig.json ./frontend/.prettierrc ./frontend/.eslintrc.json /frontend/
WORKDIR /frontend
RUN yarn install
COPY ./frontend/src /frontend/src
COPY ./config/frontend /frontend/scripts
RUN ["chmod","+x","scripts/run.sh"]

CMD ["sh","-c","scripts/run.sh"]
