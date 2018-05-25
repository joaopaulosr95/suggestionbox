default: prepare up base

prepare:
	mkdir -p mongo/member_1/data && mkdir -p mongo/member_2/data &&	mkdir -p mongo/member_3/data
	mkdir -p zabbix/mariad/data

up:
	docker-compose up --build --no-start --force-recreate

.PHONY: mongo
.PHONY: zabbix
.PHONY: webapp
# PHONY resolves the problem of make instruction corresponding to folder/file names
base: zabbix mongo webapp

zabbix:
	docker-compose start zabbixdb && sleep 5
	docker-compose start zabbixserver && sleep 60
	docker-compose start zabbixagent

mongo:
	docker-compose start mongo1 mongo2 mongo3 && sleep 10
	docker-compose start mongosetup && sleep 10
	docker-compose start adminmongo

webapp:
	docker-compose start suggestionbox webapp

build:
	docker-compose build --pull --force-rm --no-cache

drop:
	docker-compose down --remove-orphans

clean-deploy: drop clean-all build up-fresh base

clean-all:
	cd suggestionbox && make clean
	cd webapp && make clean
	cd mongo && make clean
	cd zabbix && make clean
