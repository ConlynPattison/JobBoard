package com.cst438.controllers;

import com.cst438.services.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class SearchRestControllerUnitTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private JwtService jwtService;
    private static MockHttpServletResponse response;
    final String searchEndPoint = "/api/search";

    @Test
    public void getSearchResultValid() throws Exception {

        // Validate a valid response with the required query and datePosted params
        response = mvc.perform(MockMvcRequestBuilders
                        .get(searchEndPoint)
                        .param("query", "developer")
                        .param("datePosted", "all")
                        .header("Authorization", jwtService.getToken("test"))
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        assertEquals(200, response.getStatus());
    }

    @Test
    public void getSearchResultInvalid() throws Exception {

        // Validate an invalid response without a query param
        response = mvc.perform(MockMvcRequestBuilders
                        .get(searchEndPoint)
                        .header("Authorization", jwtService.getToken("test"))
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        assertEquals(400, response.getStatus());
    }
}
