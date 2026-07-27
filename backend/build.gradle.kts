plugins {
	id("java")
	id("org.springframework.boot") version "3.3.4"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.pulsehr"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion.set(JavaLanguageVersion.of(21))
	}
}

repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
	maven { url = uri("https://repo.spring.io/snapshot") }
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-websocket")
	implementation("org.springframework.boot:spring-boot-starter-aop")
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.4.0")
	
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	
	runtimeOnly("com.mysql:mysql-connector-j")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
