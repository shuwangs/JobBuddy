# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17

MAINTAINER GFG ShuWang
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim
WORKDIR /app

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    ca-certificates \
    --no-install-recommends

# 2. install Google Chrome

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

RUN google-chrome --version

# pack and skip the testing
RUN mvn clean package -DskipTests

COPY --from=build /app/target/*.jar app.jar
# -------------Inject port ---------
EXPOSE 8080

# -------------Start  jar ---------

CMD sh -c "java -jar target/*.jar"