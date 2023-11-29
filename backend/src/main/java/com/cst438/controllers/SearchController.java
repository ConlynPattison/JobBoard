package com.cst438.controllers;

import com.cst438.config.JSearchConfigProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@RestController
public class SearchController {

    private final JSearchConfigProperties jSearchConfigProperties;

    public SearchController(JSearchConfigProperties jSearchConfigProperties) {
        this.jSearchConfigProperties = jSearchConfigProperties;
    }

    @RequestMapping(value = "/api/search", method = RequestMethod.GET)
    public ResponseEntity<String> getResult(@RequestParam(name = "query", required = true) String query,
                                            @RequestParam(name = "datePosted", required = true) String datePosted,
                                            @RequestParam(name = "employmentTypes", required = false) String employmentTypes) {
        String apiUrl = jSearchConfigProperties.apiUrl();
        String page = "1";
        String numPages = "1";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", jSearchConfigProperties.apiKey());
        headers.set("X-RapidAPI-Host", jSearchConfigProperties.apiHost());

        // Build the URI with parameters
        URI uri;
        try {
            uri = UriComponentsBuilder.fromUriString(apiUrl)
                    .queryParam("query", query)
                    .queryParam("page", page)
                    .queryParam("num_pages", numPages)
                    .queryParam("date_posted", datePosted)
                    .queryParamIfPresent("employment_types", Optional.ofNullable(employmentTypes))
                    .build()
                    .toUri();
        } catch (Exception e) {
            throw new RuntimeException("Error creating URI", e);
        }

        RequestEntity<Void> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uri);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(requestEntity, String.class);
    }
}
