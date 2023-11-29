package com.cst438.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("jsearch")
public record JSearchConfigProperties(String apiUrl, String apiKey, String apiHost) {
}
