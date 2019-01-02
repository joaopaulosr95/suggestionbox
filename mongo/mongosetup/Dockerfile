FROM mongo:4-xenial

WORKDIR /usr/src/configs

COPY replicaSet.js .
COPY setup.sh .
RUN chmod +x setup.sh replicaSet.js

CMD ["./setup.sh"]