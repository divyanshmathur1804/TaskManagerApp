FROM eclipse-temurin:21-jdk

COPY . /app
WORKDIR /app

# 👇 This line fixes the permission issue
RUN chmod +x mvnw

# Build the JAR
RUN ./mvnw clean package -DskipTests

ENTRYPOINT ["java", "-jar", "target/Backend-0.0.1-SNAPSHOT.jar"]
