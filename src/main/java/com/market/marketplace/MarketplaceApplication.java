package com.market.marketplace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class MarketplaceApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load(); // Loads variables from .env file
		SpringApplication.run(MarketplaceApplication.class, args);
	}

}
