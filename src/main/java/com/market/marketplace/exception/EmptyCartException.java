package com.market.marketplace.exception;

public class EmptyCartException extends RuntimeException {
    public EmptyCartException() {
      super("Cart is empty");
    }
}
