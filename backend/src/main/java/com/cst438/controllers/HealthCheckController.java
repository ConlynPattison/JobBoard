package com.cst438.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;


@RestController
public class HealthCheckController {
    /*
     * health check
     */
    @GetMapping("/check")
    public String healthCheck() {
        return "ok";
    }
    /*
     * terminate the server
     */
    @GetMapping("/fail")
    public void fail() {
        System.out.println("fail");
        System.exit(1);
    }
    @GetMapping("/ipaddr")
    public String getIpAddress() {
        try {
            String ip = InetAddress.getLocalHost().toString();
            return ip;
        } catch (UnknownHostException e) {
            return "unknown ip";
        }
    }
}
