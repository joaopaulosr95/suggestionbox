default: prepare up base

prepare:
	mkdir -p mongo/member_1/data && mkdir -p mongo/member_2/data &&	mkdir -p mongo/member_3/data

up:
	docker-compose up --build --no-start --force-recreate

.PHONY: mongo
base: mongo

mongo:
	docker-compose start mongo1 mongo2 mongo3 && sleep 10
	docker-compose start mongosetup && sleep 10
	docker-compose start adminmongo

build:
	docker-compose build --pull --force-rm --no-cache

drop:
	docker-compose down --remove-orphans

clean-deploy: drop clean-all build up-fresh base

clean-all:
	cd mongo && make clean