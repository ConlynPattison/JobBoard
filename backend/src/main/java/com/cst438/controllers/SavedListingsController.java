package com.cst438.controllers;

import com.cst438.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
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

    // TODO: resolve enum issue
    @RequestMapping(value = "/api/saved/details", method = RequestMethod.GET)
    public StatefulListingDTO[] getAllSavedListings(Principal principal) {
        // TODO: authorize the user request

        // get all saved_listing entries with this user_id
        List<SavedListing> savedListings = savedListingRepository.findAllByUsername(principal.getName());

        // cast these saved_listing entries to DTO[] -> return this array
        StatefulListingDTO[] statefulListingDTOs = new StatefulListingDTO[savedListings.size()];

        for (int i = 0; i < savedListings.size(); i++) {
            SavedListing savedListing = savedListings.get(i);
            Listing listing = savedListing.getListing();
            statefulListingDTOs[i] = new StatefulListingDTO(
                    listing.getExternalId(),
                    savedListing.getState(),
                    listing.getJobTitle(),
                    listing.getCompanyLogoUrl(),
                    listing.getApplicationUrl()
            );
        }

        return statefulListingDTOs;
    }

    @RequestMapping(value = "/api/saved", method = RequestMethod.POST)
    public int createSavedListing(Principal principal,
                                  @RequestBody ListingDTO listingDTO) {
        // TODO: authorize the user request

        Listing listing = new Listing();

        // check if the listing exists in the db already -> create it if not
        if (listingRepository.findByExternalId(listingDTO.externalId()) == null) {
            listing.setExternalId(listingDTO.externalId());
            listing.setApplicationUrl(listingDTO.applicationUrl());
            listing.setCompanyLogoUrl(listingDTO.companyLogoUrl());
            listing.setJobTitle(listingDTO.jobTitle());

            listing = listingRepository.save(listing);
        } else
            listing = listingRepository.findByExternalId(listingDTO.externalId());

        SavedListing savedListing = savedListingRepository.findByUsernameAndExternalId(
                principal.getName(),
                listing.getExternalId());

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
        savedListing.setState(SavedListingState.SAVED);
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
    @Transactional
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

    // Try a DELETE using an external job_id from external web api rather than db id
    @RequestMapping(value = "/api/saved/external/{id}", method = RequestMethod.DELETE)
    @Transactional
    public void removeSavedListingExternal(Principal principal,
                                           @PathVariable String id) {
        // TODO: authorize the user request

        // check that the saved_listing belongs to this user -> respond with error if not
        SavedListing savedListing = savedListingRepository.findByUsernameAndExternalId(principal.getName(), id);
        if (savedListing == null)
            return;

        if (!savedListing.getUser().getUsername().equals(principal.getName()))
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "SavedListing of external id" + id +
                            " does not belong to username " + principal.getName()
            );

        // delete the saved_listing
        savedListingRepository.delete(savedListing);
    }
}
