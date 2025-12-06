package com.example.khorasan.controller;

import com.example.khorasan.model.BlogPost;
import com.example.khorasan.model.Category;
import com.example.khorasan.model.ContactMessage;
import com.example.khorasan.model.Product;
import com.example.khorasan.service.ContentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicController {

    private final ContentService contentService;

    public PublicController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return contentService.getProducts();
    }

    @GetMapping("/products/latest")
    public List<Product> getLatestProducts() {
        return contentService.getLatestProducts(6);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return contentService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return contentService.getCategories();
    }

    @GetMapping("/categories/latest")
    public List<Category> getLatestCategories() {
        return contentService.getLatestCategories(6);
    }

    @GetMapping("/categories/{id}/products")
    public List<Product> getProductsByCategory(@PathVariable Long id) {
        return contentService.getProductsByCategory(id);
    }

    @GetMapping("/blogs")
    public List<BlogPost> getBlogs() {
        return contentService.getBlogPosts();
    }

    @GetMapping("/blogs/latest")
    public List<BlogPost> getLatestBlogs() {
        return contentService.getLatestBlogPosts(3);
    }

    @GetMapping("/blogs/{id}")
    public ResponseEntity<BlogPost> getBlog(@PathVariable Long id) {
        return contentService.getBlogPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactMessage> sendContact(@Valid @RequestBody ContactMessage message) {
        return ResponseEntity.ok(contentService.saveContactMessage(message));
    }
}
