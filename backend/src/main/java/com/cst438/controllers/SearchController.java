package com.cst438.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
public class SearchController {

    // todo: remove the hard-coded values and sub them for Optionals from query params
    @RequestMapping(value = "/api/search", method = RequestMethod.GET)
    public ResponseEntity<String> getResult() {
        String apiUrl = "https://jsearch.p.rapidapi.com/search";
        String query = "Python developer in Texas, USA";
        String page = "1";
        String numPages = "1";

        HttpHeaders headers = new HttpHeaders();
        // todo: externalize these key-values to some type of environment variable
        headers.set("X-RapidAPI-Key", "d6f283f8c4msh64ea8d8b52c9025p1878c0jsne537dd7faef5");
        headers.set("X-RapidAPI-Host", "jsearch.p.rapidapi.com");

        // Build the URI with parameters
        URI uri;
        try {
            uri = UriComponentsBuilder.fromUriString(apiUrl)
                    .queryParam("query", query)
                    .queryParam("page", page)
                    .queryParam("num_pages", numPages)
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
