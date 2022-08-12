FROM python:3.10

ARG DEBUG

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python3 && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY ./backend/ /backend/
WORKDIR /backend

COPY ./config/scripts/connection_test /scripts/connection_test
COPY ./config/backend/ /scripts/
RUN ["chmod","+x","/scripts/connection_test"]
RUN ["chmod","+x","/scripts/run.sh"]
RUN ["chmod","+x","/scripts/install.sh"]
RUN ["sh", "-c", "/scripts/install.sh"]
CMD ["sh","-c","/scripts/run.sh"]

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
