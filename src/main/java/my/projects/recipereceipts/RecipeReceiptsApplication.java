package my.projects.recipereceipts;

import my.projects.recipereceipts.security.jwt.JwtConfig;
import my.projects.recipereceipts.security.jwt.JwtUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class RecipeReceiptsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipeReceiptsApplication.class, args);
	}

	@Bean
	JwtConfig jwtConfig() {
		return new JwtConfig();
	}

	@Bean
	JwtUtils jwtUtils() { return new JwtUtils(); }
}
