package com.cst438.controllers;

import com.cst438.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
public class SavedListingsController {

    private final ListingRepository listingRepository;
    private final SavedListingRepository savedListingRepository;
    private final UserRepository userRepository;

    public SavedListingsController(ListingRepository listingRepository,
                                   SavedListingRepository savedListingRepository,
                                   UserRepository userRepository) {
        this.listingRepository = listingRepository;
        this.savedListingRepository = savedListingRepository;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.GET)
    public SavedListingDTO getSavedListing(Principal principal,
                                           @PathVariable Integer id) {
        // TODO: authorize the user request

        // get the saved_listing entry with this saved_listing id
        SavedListing savedListing = savedListingRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "SavedListing of id " + id + " not found"
                )
        );

        // validate the user_id is the same as the requesting users' -> return error if not
        if (!savedListing.getUser().getUsername().equals(principal.getName()))
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "SavedListing of id " + id + " does not belong to username " + principal.getName()
            );

        // cast the saved_listing to a DTO -> return this DTO
        return new SavedListingDTO(
                savedListing.getId(),
                savedListing.getState(),
                savedListing.getUser().getId(),
                savedListing.getListing().getId()
        );
    }

    @RequestMapping(value = "/api/saved", method = RequestMethod.GET)
    public SavedListingDTO[] getAllSavedListings(Principal principal) {
        // TODO: authorize the user request

        // get all saved_listing entries with this user_id
        List<SavedListing> savedListings = savedListingRepository.findAllByUsername(principal.getName());

        // cast these saved_listing entries to DTO[] -> return this array
        SavedListingDTO[] savedListingDTOs = new SavedListingDTO[savedListings.size()];

        for (int i = 0; i < savedListings.size(); i++) {
            SavedListing savedListing = savedListings.get(i);
            savedListingDTOs[i] = new SavedListingDTO(
                    savedListing.getId(),
                    savedListing.getState(),
                    savedListing.getUser().getId(),
                    savedListing.getListing().getId()
            );
        }

        return savedListingDTOs;
    }

    @RequestMapping(value = "/api/saved", method = RequestMethod.POST)
    public int createSavedListing(Principal principal,
                                  @RequestBody SavedListingDTO savedListingDTO,
                                  @RequestBody ListingDTO listingDTO) {
        // TODO: authorize the user request

        Listing listing = new Listing();

        // check if the listing exists in the db already -> create it if not
        if (!listingRepository.existsById(listingDTO.id())) {
            listing.setApplicationUrl(listingDTO.applicationUrl());
            listing.setCompanyLogoUrl(listingDTO.companyLogoUrl());
            listing.setJobTitle(listingDTO.jobTitle());

            listing = listingRepository.save(listing);
        } else
            listing = listingRepository.findById(listingDTO.id()).orElseThrow();

        SavedListing savedListing = savedListingRepository.findByUsernameAndListingId(
                principal.getName(),
                listing.getId());

        // check if the user has already saved this listing -> exit request if so
        if (savedListing != null)
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username " + principal.getName() +
                            " already has listing id " + listing.getId() +
                            " saved to their profile under state " + savedListing.getState()
            );

        // create the saved_listing record -> return the id
        savedListing = new SavedListing();
        savedListing.setListing(listing);
        savedListing.setState(savedListingDTO.state());
        savedListing.setUser(userRepository.findByUsername(principal.getName()));
        savedListing = savedListingRepository.save(savedListing);

        return savedListing.getId();
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.PATCH)
    public void updateSavedListing(Principal principal,
                                   @PathVariable Integer id,
                                   @RequestBody SavedListingState state) {
        // TODO: authorize the user request

        // check if the listing exists -> if not exit with error
        SavedListing savedListing = savedListingRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "SavedListing id " + id + " not found"
                )
        );

        // change the value of the saved_listing state to that provided
        savedListing.setState(state);

        savedListingRepository.save(savedListing);
    }

    @RequestMapping(value = "/api/saved/{id}", method = RequestMethod.DELETE)
    public void removeSavedListing(Principal principal,
                                   @PathVariable Integer id) {
        // TODO: authorize the user request

        // check that the saved_listing belongs to this user -> respond with error if not
        SavedListing savedListing = savedListingRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "SavedListing of id " + id + " not found"
                )
        );

        if (!savedListing.getUser().getUsername().equals(principal.getName()))
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "SavedListing of id " + id +
                            " does not belong to username " + principal.getName()
            );

        // delete the saved_listing
        savedListingRepository.deleteById(id);
    }
}
