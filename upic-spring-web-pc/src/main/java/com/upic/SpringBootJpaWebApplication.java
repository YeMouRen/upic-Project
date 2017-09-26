package com.upic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2 
//@EnableJdbcHttpSession
@ImportResource("classpath:consumer.xml")

public class SpringBootJpaWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootJpaWebApplication.class, args);
	}
}
