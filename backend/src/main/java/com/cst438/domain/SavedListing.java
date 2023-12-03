package com.cst438.domain;

import javax.persistence.*;

@Entity
public class SavedListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Listing listing;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    private SavedListingState state;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SavedListingState getState() {
        return state;
    }

    public void setState(SavedListingState state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "SavedListing{" +
                "id=" + id +
                ", listing=" + listing.getId() +
                ", user=" + user.getId() +
                ", state=" + state +
                '}';
    }
}
