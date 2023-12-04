package com.cst438.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ListingRepository extends CrudRepository<Listing, Integer> {
    @Query("select a from Listing a where a.externalId= :external_id")
    Listing findByExternalId(
            @Param("external_id") String externalId);
}
