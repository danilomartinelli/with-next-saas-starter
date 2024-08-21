# Makefile

# Usage:
#   make start           - Start the services
#   make start-dev       - Start the services with development helpers
#   make stop            - Stop the services
#   make destroy         - Destroy the services, including volumes and orphans
#   make config          - Show the effective Docker Compose configuration

start:
	@docker compose --env-file ./docker/.env -f ./docker/docker-compose.yml up

start-dev:
	@docker compose --env-file ./docker/.env -f ./docker/docker-compose.yml -f ./docker/dev/docker-compose.dev.yml up

stop:
	@docker compose --env-file ./docker/.env -f ./docker/docker-compose.yml down

destroy:
	@docker compose --env-file ./docker/.env -f ./docker/docker-compose.yml -f ./docker/dev/docker-compose.dev.yml down -v --remove-orphans

config:
	@docker compose --env-file ./docker/.env -f ./docker/docker-compose.yml -f ./docker/dev/docker-compose.dev.yml config
