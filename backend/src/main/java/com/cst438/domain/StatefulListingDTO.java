package com.cst438.domain;

public record StatefulListingDTO(String externalId, SavedListingState state, String jobTitle, String companyLogoUrl, String applicationUrl) {
}
