package com.cst438.controllers;

import com.cst438.domain.ListingRepository;
import com.cst438.domain.SavedListingRepository;
import com.cst438.services.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class SavedListingsControllerUnitTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private SavedListingRepository savedListingRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private JwtService jwtService;

    private static MockHttpServletResponse response;

    @Test
    public void getSavedListing() throws Exception {
        // todo:
    }

    @Test
    public void createSavedListing() throws Exception {

    }

    @Test
    public void updateSavedListing() throws Exception {

    }

    @Test
    public void removeSavedListingExternal() throws Exception {

    }
}
