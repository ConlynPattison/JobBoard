package com.cst438;

import com.cst438.utils.Authentication;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class SavedListingsEndToEndTests {
    public static final String CHROME_DRIVER_FILE_LOCATION = "/Users/conlynpattison/Desktop/chromedriver";
    public static final String URL = "http://localhost:3000";
    public static final int SLEEP_DURATION = 1000; // 1 second.

    @Autowired
    public Authentication authentication;


    @Test
    public void addCourseTest() throws Exception {
        System.setProperty("webdriver.chrome.driver", CHROME_DRIVER_FILE_LOCATION);
        WebDriver driver = new ChromeDriver();
        // Puts an Implicit wait for 10 seconds before throwing exception
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        driver.get(URL);
        Thread.sleep(SLEEP_DURATION);

        WebElement w;


        try {
            // navigate to login

            // login the webdriver with test account
        } catch (Exception ex) {
            throw ex;
        } finally {
            driver.quit();
        }

    }
}
