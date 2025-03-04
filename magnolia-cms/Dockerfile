FROM eclipse-temurin:21-alpine as build

WORKDIR /app/src
COPY . .

# Install maven
RUN wget https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz
RUN tar xzf apache-maven-3.9.9-bin.tar.gz

# Build bundle of Magnolia
RUN apache-maven-3.9.9/bin/mvn clean package

FROM tomcat:9.0.100-jdk21-temurin

# ENV variables for Magnolia
ENV MGNL_APP_DIR /opt/magnolia/data
ENV MGNL_RESOURCES_DIR=/opt/magnolia/light-modules
ENV MGNL_REPOSITORIES_DIR ${MGNL_APP_DIR}/repositories
ENV MGNL_LOGS_DIR ${MGNL_APP_DIR}/logs
ENV MGNL_AUTHOR=true

# ARGS
ARG MGNL_HEAP=1024M

# JVM PARAMS
ENV CATALINA_OPTS -server \
    -Djava.security.egd=file:/dev/./urandom \
    -Xms64M -Xmx${MGNL_HEAP} -Djava.awt.headless=true \
    -Dmagnolia.bootstrap.authorInstance=${MGNL_AUTHOR} \
    -Dmagnolia.repositories.home=${MGNL_REPOSITORIES_DIR} \
    -Dmagnolia.author.key.location=${MGNL_APP_DIR}/magnolia-activation-keypair.properties \
    -Dmagnolia.logs.dir=${MGNL_LOGS_DIR} \
    -Dmagnolia.resources.dir=${MGNL_RESOURCES_DIR} \
    -Dmagnolia.update.auto=true

# VOLUME for Magnolia
VOLUME [ "${MGNL_APP_DIR}" ]

# MGNL war
COPY --from=build /app/src/magnolia-cms-webapp/target/magnolia-cms-webapp-1.0-SNAPSHOT.war $CATALINA_HOME/webapps/ROOT.war
