package com.market.marketplace.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
      super("Invalid password");
    }
}
