package com.cst438.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SavedListingRepository extends CrudRepository<SavedListing, Integer> {

    @Query("select a from SavedListing a where a.user.username= :username order by a.id")
    List<SavedListing> findAllByUsername(@Param("username") String username);

    @Query("select a from SavedListing a where a.user.username= :username and a.listing.id= :listing_id")
    SavedListing findByUsernameAndListingId(
            @Param("username") String username,
            @Param("listing_id") Integer listingId);
}
