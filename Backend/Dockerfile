FROM eclipse-temurin:21-jdk

COPY . /app
WORKDIR /app
RUN ./mvnw clean package -DskipTests

ENTRYPOINT ["java", "-jar", "target/Backend-0.0.1-SNAPSHOT.jar"]
