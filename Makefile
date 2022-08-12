SHELL := /bin/bash

COMPOSE=docker-compose -f docker-compose.yml

help:
	@echo -e "backend-up\t\t\t\t -- run backend docker as a daemon"
	@echo -e "frontend-up\t\t\t\t -- run frontend docker as a daemon"
	@echo -e "up\t\t\t\t\t -- run environment as a daemon"
	@echo -e "down\t\t\t\t\t -- stop and remove all containers"
	@echo -e "stop\t\t\t\t\t -- stop all containers without remove"
	@echo -e "restart\t\t\t\t\t -- restart all running containers"
	@echo -e "backend-build\t\t\t\t -- build backend docker image"
	@echo -e "frontend-build\t\t\t\t -- build frontend docker image"
	@echo -e "backend-shell\t\t\t\t -- run shell on backend container"
	@echo -e "backend-test\t\t\t\t -- run tests backend container"
	@echo -e "backend-reformat\t\t\t -- reformat code on backend"
	@echo -e "backend-lint\t\t\t\t -- check backend code by linters"

backend-up:
	@$(COMPOSE) up -d backend

frontend-up:
	@$(COMPOSE) up -d frontend

up:
	@$(COMPOSE) up -d

down:
	@$(COMPOSE) down

stop: backend-up
	@$(COMPOSE) stop

restart: backend-up
	@$(COMPOSE) restart

backend-build: down
	@$(COMPOSE) build backend

frontend-build: down
	@$(COMPOSE) build frontend

backend-shell: backend-up
	@$(COMPOSE) exec backend bash

backend-test:
	@$(COMPOSE) run --rm --no-deps backend bash -c "\
		pytest .;\
		"

backend-reformat:
	@$(COMPOSE) run --rm --no-deps backend bash -c "\
		isort .;\
		black .;\
		"

backend-lint:
	@$(COMPOSE) run --rm --no-deps backend bash -c "\
		flake8 .;\
		pylint app/;\
		mypy .;\
		"; 3>/dev/null
