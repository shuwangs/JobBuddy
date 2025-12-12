src/main/java/com/jobbuddy/backend
├── config          <-- 存放配置类 (如 Swagger配置, Cors配置)
├── controller      <-- 存放控制器 (JobController)
├── dto             <-- 存放数据传输对象 (如前端传来的参数对象)
├── exception       <-- 存放全局异常处理
├── model           <-- 存放数据库实体 (Job, JobStatus)
├── repository      <-- 存放数据库接口 (JobRepository)
├── service         <-- 存放业务逻辑 (JobService)
└── BackendApplication.java  <-- 启动类 (保持在最外层)

1) 技术栈（就用这套）

Java 17

Spring Boot 3（Web / Validation / Security）

Spring Data JPA + PostgreSQL

Flyway（数据库迁移）

JWT（jjwt）

OpenAPI/Swagger（springdoc）