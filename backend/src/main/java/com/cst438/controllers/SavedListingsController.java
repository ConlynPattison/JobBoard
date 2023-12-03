package com.cst438.controllers;

import com.cst438.domain.SavedListingDTO;
import com.cst438.domain.SavedListingState;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class SavedListingsController {

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.GET)
    public SavedListingDTO getSavedListing(Principal principal) {
        // TODO:
        return new SavedListingDTO(0, SavedListingState.SAVED, 0, 0);
    }

    @RequestMapping(value = "/api/saved", method = RequestMethod.GET)
    public SavedListingDTO[] getAllSavedListings(Principal principal) {
        // TODO:
        return new SavedListingDTO[]{
                new SavedListingDTO(0, SavedListingState.SAVED, 0, 0)
        };
    }

    @RequestMapping(value = "/api/saved", method = RequestMethod.POST)
    public int createSavedListing(Principal principal) {
        // TODO:
        return 1;
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.PATCH)
    public void updateSavedListing(Principal principal) {
        // TODO:
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.DELETE)
    public void removeSavedListing(Principal principal) {
        // TODO:
    }
}