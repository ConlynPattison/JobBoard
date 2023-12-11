package com.cst438;

import com.cst438.domain.*;
import com.cst438.utils.Authentication;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
public class SavedListingsEndToEndTests {
    public static final String CHROME_DRIVER_FILE_LOCATION = "/Users/conlynpattison/Desktop/chromedriver";
    public static final String URL = "http://localhost:3000";
    public static final int SLEEP_DURATION = 1000; // 1 second.

    @Autowired
    private SavedListingRepository savedListingRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Authentication authentication;

    @Test
    public void addSavedListingTest() throws Exception {
        System.setProperty("webdriver.chrome.driver", CHROME_DRIVER_FILE_LOCATION);
        WebDriver driver = new ChromeDriver();
        // Puts an Implicit wait for 10 seconds before throwing exception
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        driver.get(URL);
        Thread.sleep(SLEEP_DURATION);

        try {
            // create listing and a savedListing under the test account
            Listing listingA = new Listing();
            listingA.setExternalId("A-External");
            listingA.setApplicationUrl("A-App");
            listingA.setJobTitle("A-Title");
            listingA.setCompanyLogoUrl("A-Logo");
            listingA = listingRepository.save(listingA);

            SavedListing savedListingA = new SavedListing();
            savedListingA.setListing(listingA);
            savedListingA.setState(SavedListingState.SAVED);
            savedListingA.setUser(userRepository.findByUsername("test"));
            savedListingA = savedListingRepository.save(savedListingA);

            // navigate to login
            driver.navigate().to("/login");
            Thread.sleep(SLEEP_DURATION);

            // login the webdriver with test account
            authentication.authenticateForTest(driver);
            Thread.sleep(SLEEP_DURATION);

            // navigate to the profile page
            driver.navigate().to("/profile");
            Thread.sleep(SLEEP_DURATION);

            // grab the list of saved listings found on the profile page
            List<WebElement> foundElements = driver.findElements(By.xpath("//tr[td[@id='" + listingA.getExternalId() + "']]"));

            // validate that each of the above created listings exist on the profile table
            assertThat(foundElements)
                    .withFailMessage("SavedListing of external_id" + listingA.getExternalId() + " not found")
                    .isNotEmpty();

            // remove the two saved listings and listing for each
            savedListingRepository.delete(savedListingA);
            listingRepository.delete(listingA);
        } catch (Exception ex) {
            throw ex;
        } finally {
            driver.quit();
        }

    }
}
