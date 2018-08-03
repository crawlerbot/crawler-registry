FROM openjdk:8-jre-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JAVA_OPTS="" \
    SIMLIFE_SLEEP=0

VOLUME /tmp
EXPOSE 8761
CMD echo "The application will start in ${SIMLIFE_SLEEP}s..." && \
    sleep ${SIMLIFE_SLEEP} && \
    java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /app.war

# add directly the war
ADD *.war /app.war
