package com.cst438.controllers;

import com.cst438.domain.*;
import com.cst438.services.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static com.cst438.TestUtils.*;
import static org.junit.jupiter.api.Assertions.*;

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
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private static MockHttpServletResponse response;

    @Test
    public void getSavedListing() throws Exception {
        // create a SavedListing with this listing and user
        String jwt = jwtService.getToken("test");
        User testUser = userRepository.findByUsername("test");
        Listing listing = new Listing();
        SavedListing savedListing = new SavedListing();

        savedListing.setUser(testUser);
        savedListing.setState(SavedListingState.SAVED);
        savedListing.setListing(listing);
        listingRepository.save(listing);
        savedListing = savedListingRepository.save(savedListing);

        // call the mvc to get the listing
        response = mvc.perform(MockMvcRequestBuilders
                        .get("/api/saved/" + savedListing.getId())
                        .header("Authorization", jwt)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();

        // check that the call was successful
        assertEquals(200, response.getStatus());

        // validate that the listing was fetched and is the same listing
        assertEquals(fromJsonString(response.getContentAsString(), SavedListingDTO.class),
                new SavedListingDTO(
                        savedListing.getId(),
                        SavedListingState.SAVED,
                        testUser.getId(),
                        listing.getId())
        );

        // clean DB
        savedListingRepository.delete(savedListing);
        listingRepository.delete(listing);
    }

    @Test
    public void createSavedListing() throws Exception {
        String jwt = jwtService.getToken("test");

        // create a listingDTO
        ListingDTO listingDTO = new ListingDTO(
                3,
                "external",
                "title",
                "logo",
                "app"
        );

        // create SavedListing with mvc
        response = mvc.perform(MockMvcRequestBuilders
                        .post("/api/saved")
                        .header("Authorization", jwt)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(asJsonString(listingDTO)))
                .andReturn()
                .getResponse();

        // assert that the call was successful
        assertEquals(200, response.getStatus());

        // assert that returned id is not null
        Integer id = fromJsonString(response.getContentAsString(), Integer.class);
        assertNotNull(id);

        // remove the SavedListing
        savedListingRepository.deleteById(id);
    }

    @Test
    public void updateSavedListing() throws Exception {
        // create a listing

        // create a SavedListing

        // call the mvc to update the value of the SavedListing state

        // assert that the call was successful

        // assert that the SavedListing state was changed properly

        // remove the SavedListing
    }

    @Test
    public void removeSavedListingExternal() throws Exception {
        // create a listing

        // create a SavedListing

        // call the mvc to remove the SavedListing with the externalId

        // assert that the call was successful

        // assert that the SavedListing was removed

        // remove the listing
    }
}
