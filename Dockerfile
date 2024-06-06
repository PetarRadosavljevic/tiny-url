FROM mongo:6.0
COPY custom-user.sh /docker-entrypoint-initdb.d/
