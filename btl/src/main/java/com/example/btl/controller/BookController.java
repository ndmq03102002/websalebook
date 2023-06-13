package com.example.btl.controller;

import com.example.btl.exception.BookExistsException;
import com.example.btl.exception.ItemNotFoundException;
import com.example.btl.model.Book;
import com.example.btl.repository.BookRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import javax.imageio.ImageIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/")
public class BookController {
	private String path=new File("src/main/resources/static/images/").getAbsolutePath()+"\\";	
	@Autowired
	private  BookRepository bookRepository;
	
	@GetMapping
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	@GetMapping("/user/search/{str}")
	public List<Book> getBooks(@PathVariable String str){
		return bookRepository.findAllByString(str);
	}
	@GetMapping("/user/book/{id}")
	public Book getBookForUser(@PathVariable String id) {
		return getBook(id);
	}
	@GetMapping("/admin/book/{id}")
	public Book getBook(@PathVariable String id){
		try {
			return bookRepository.findById(Integer.parseInt(id)).get();
		}
		catch(Exception e) {
			throw new ItemNotFoundException();
		}
	}
	@DeleteMapping("/admin/book/delete/{id}")
	public void deleteBook(@PathVariable int id){
		Book book=bookRepository.findById(id).get();
		deleteImage(book.getImgPath());
		bookRepository.delete(book);
	}
	@PostMapping(value="/admin/book/save")
	public void updateBook(@RequestPart(value="image",required = false) MultipartFile image,@RequestPart(value = "data") String bookJson) throws Exception{
		ObjectMapper mapper = new ObjectMapper();
		Book book= mapper.readValue(bookJson, Book.class);
		if(book.getAuthor()==null || book.getReleaseDate() ==null || book.getTitle()==null) return;
		book.setAuthor(book.getAuthor().trim().replaceAll("  +", " "));
		book.setTitle(book.getTitle().trim().replaceAll("  +", " "));
		Book tmp=bookRepository.findByTitleAndAuthor(book.getTitle(),book.getAuthor());
		if(tmp!=null && (tmp.getId()!=book.getId())) throw new BookExistsException();
		else {
			if(image!=null) {
				deleteImage(book.getImgPath());
				String imageFileName=addImage(image);
				book.setImgPath(imageFileName);
			}
			bookRepository.save(book);
		}
	}
	@PutMapping(value="/admin/book/new")
	public void addBook(@RequestPart(value="image",required = false) MultipartFile image,@RequestPart(value = "data") String bookJson) throws JsonMappingException, JsonProcessingException{
		ObjectMapper mapper = new ObjectMapper();
		Book book = mapper.readValue(bookJson, Book.class);
		if(book.getAuthor()==null || book.getReleaseDate() ==null || book.getTitle()==null) return;
		book.setAuthor(book.getAuthor().trim().replaceAll("  +", " "));
		book.setTitle(book.getTitle().trim().replaceAll("  +", " "));
		Book tmp=bookRepository.findByTitleAndAuthor(book.getTitle(),book.getAuthor());
		if(tmp!=null) throw new BookExistsException();
		else {
			if(image!=null) {
				String imageFileName=addImage(image);
				book.setImgPath(imageFileName);
			}
			bookRepository.save(book);
		}
	} 
	@GetMapping("/images/{imgName}")
	public ResponseEntity<Object> getImage(@PathVariable ("imgName") String imgName) {
		try {
			return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("image/"+imgName.split("\\.")[1]))
				.body(new InputStreamResource(new FileInputStream(new File(path+imgName))));
		}
		catch(Exception e) {}
		return ResponseEntity.ok().body("");
	}
	public String addImage(MultipartFile file) {
		try {
			String extension=file.getOriginalFilename().split("\\.")[1];
			String imageName=""+System.currentTimeMillis()+"."+extension;
			BufferedImage imageBuffered = ImageIO.read(file.getInputStream());
			ImageIO.write(imageBuffered,extension,new File(path+imageName));
			return imageName;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void deleteImage(String imgName) {
		if(imgName==null) return;
		try {
			Files.deleteIfExists(Paths.get(path+imgName));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
