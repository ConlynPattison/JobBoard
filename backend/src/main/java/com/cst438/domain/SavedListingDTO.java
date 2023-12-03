package com.cst438.domain;

public record SavedListingDTO(int id, SavedListingState state, int userId, int listingId) {
}
