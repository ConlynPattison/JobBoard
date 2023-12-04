package com.cst438.controllers;

import com.cst438.domain.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class SavedListingsController {

    private final ListingRepository listingRepository;
    private final SavedListingRepository savedListingRepository;

    public SavedListingsController(ListingRepository listingRepository,
                                   SavedListingRepository savedListingRepository) {
        this.listingRepository = listingRepository;
        this.savedListingRepository = savedListingRepository;
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.GET)
    public SavedListingDTO getSavedListing(Principal principal) {
        // authorize the user request

        // get the saved_listing entry with this saved_listing id

        // validate the user_id is the same as the requesting users' -> return error if not

        // cast the saved_listing to a DTO -> return this DTO

        return new SavedListingDTO(0, SavedListingState.SAVED, 0, 0);
    }

    @RequestMapping(value = "/api/saved", method = RequestMethod.GET)
    public SavedListingDTO[] getAllSavedListings(Principal principal) {
        // authorize the user request

        // get all saved_listing entries with this user_id

        // cast these saved_listing entries to DTO[] -> return this array

        return new SavedListingDTO[]{
                new SavedListingDTO(0, SavedListingState.SAVED, 0, 0)
        };
    }

    @RequestMapping(value = "/api/saved", method = RequestMethod.POST)
    public int createSavedListing(Principal principal,
                                  @RequestBody SavedListingDTO savedListingDTO,
                                  @RequestBody ListingDTO listingDTO) {
        // authorize the user request

        // check if the listing exists in the db already -> create it if not

        // check if the user has already saved this listing -> exit request if so

        // create the saved_listing record -> return the id

        return 1;
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.PATCH)
    public void updateSavedListing(Principal principal) {
        // authorize the user request

        // check if the listing exists -> if not exit with error

        // change the value of the saved_listing state to that provided
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.DELETE)
    public void removeSavedListing(Principal principal) {
        // authorize the user request

        // delete the saved_listing
    }
}
