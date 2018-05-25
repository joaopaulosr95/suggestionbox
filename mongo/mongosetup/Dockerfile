FROM mongo:3.6-jessie

WORKDIR /usr/src/configs

COPY replicaSet.js .
COPY setup.sh .
RUN chmod +x setup.sh replicaSet.js

CMD ["./setup.sh"]
