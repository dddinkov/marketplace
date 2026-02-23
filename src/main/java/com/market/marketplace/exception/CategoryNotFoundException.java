package com.market.marketplace.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException() {
      super("Category not found");
    }
}
