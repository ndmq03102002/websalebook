package com.example.btl.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ExceptionController {
	@ResponseBody
	@ExceptionHandler(value = BookExistsException.class)
	public Object exception(BookExistsException exception) {
		return new ResponseEntity<Object>("\"Sách đã tồn tại!\"", HttpStatus.CONFLICT);
	}
	@ResponseBody
	@ExceptionHandler(value = ItemNotFoundException.class)
	public Object exception(ItemNotFoundException exception) {
		return new ResponseEntity<Object>("\"404 Not Found\"", HttpStatus.NOT_FOUND);
	}
	@ExceptionHandler(value = UserExistsException.class)
	public Object exception(UserExistsException exception) {
		return new ResponseEntity<Object>("\"Tài khoản đã tồn tại\"", HttpStatus.CONFLICT);
	}
}
