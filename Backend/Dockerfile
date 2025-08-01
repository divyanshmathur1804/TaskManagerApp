FROM eclipse-temurin:21-jdk

# Removed VOLUME /tmp (not allowed on Railway)
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
