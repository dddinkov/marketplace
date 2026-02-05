package com.market.marketplace.dto;

public record OrderRequest(
        String address,
        Double price
) {}
