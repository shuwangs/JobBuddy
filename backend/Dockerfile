# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17

MAINTAINER GFG ShuWang
WORKDIR /app

# copy backend staff
COPY . .
# pack and skip the testing
RUN mvn clean package -DskipTests

# -------------Inject port ---------
EXPOSE 8080

# -------------Start  jar ---------

CMD sh -c "java -jar target/*.jar"