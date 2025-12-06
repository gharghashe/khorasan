package com.example.khorasan.controller;

import com.example.khorasan.model.BlogPost;
import com.example.khorasan.model.Category;
import com.example.khorasan.model.Product;
import com.example.khorasan.service.ContentService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ContentService contentService;

    public AdminController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("name", "");
        String description = body.getOrDefault("description", "");
        String imageUrl = body.getOrDefault("imageUrl", "");
        Long categoryId = Long.parseLong(body.getOrDefault("categoryId", "0"));
        double price = Double.parseDouble(body.getOrDefault("price", "0"));

        Product product = contentService.createProduct(name, description, imageUrl, categoryId, price);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> addCategory(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("name", "");
        String description = body.getOrDefault("description", "");
        Category category = contentService.createCategory(name, description);
        return ResponseEntity.ok(category);
    }

    @PostMapping("/blogs")
    public ResponseEntity<BlogPost> addBlog(@RequestBody BlogRequest request) {
        BlogPost post = contentService.createBlogPost(request.title(), request.excerpt(), request.content(), request.publishedDate());
        return ResponseEntity.ok(post);
    }

    public record BlogRequest(@NotBlank String title,
                              @NotBlank String excerpt,
                              @NotBlank String content,
                              @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate publishedDate) {
    }
}
