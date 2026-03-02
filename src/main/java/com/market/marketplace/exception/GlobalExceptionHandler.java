package com.market.marketplace.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 409
    @ExceptionHandler({EmailAlreadyUsedException.class, InvalidPasswordException.class, EmptyCartException.class})
    public ResponseEntity<String> handleConflictException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ex.getMessage());
    }


    // 404
    @ExceptionHandler({ProductNotFoundException.class, UserNotFoundException.class, CategoryNotFoundException.class})
    ResponseEntity<String> handleNotFoundException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }
}
