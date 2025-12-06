package com.example.khorasan.service;

import com.example.khorasan.model.BlogPost;
import com.example.khorasan.model.Category;
import com.example.khorasan.model.ContactMessage;
import com.example.khorasan.model.Product;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ContentService {
    private final List<Product> products = new ArrayList<>();
    private final List<Category> categories = new ArrayList<>();
    private final List<BlogPost> blogPosts = new ArrayList<>();
    private final List<ContactMessage> contactMessages = new ArrayList<>();
    private final AtomicLong productId = new AtomicLong(1);
    private final AtomicLong categoryId = new AtomicLong(1);
    private final AtomicLong blogId = new AtomicLong(1);

    @PostConstruct
    public void seedData() {
        Category lighting = createCategory("روشنایی", "انواع چراغ های تزئینی و صنعتی");
        Category cables = createCategory("سیم و کابل", "سیم و کابل های فشار قوی و ضعیف");
        Category tools = createCategory("ابزار صنعتی", "ابزار دقیق و ایمنی کارگاه");

        createProduct("چراغ سقفی LED", "چراغ سقفی کم مصرف مناسب فضاهای اداری و مسکونی", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", lighting.getId(), 850000);
        createProduct("پروژکتور نما", "پروژکتور ضدآب برای نمای ساختمان", "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd", lighting.getId(), 1250000);
        createProduct("کابل افشان ۴ رشته", "کابل مناسب انتقال برق با عایق PVC", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", cables.getId(), 455000);
        createProduct("سیم تلفن هوایی", "سیم مقاوم در برابر اشعه خورشید", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", cables.getId(), 210000);
        createProduct("انبردست صنعتی", "ابزار فولادی با روکش ضد لغزش", "https://images.unsplash.com/photo-1516726817505-f5ed825624d8", tools.getId(), 180000);
        createProduct("چراغ اضطراری دیواری", "چراغ اضطراری با باتری داخلی و مدت زمان روشنایی بالا", "https://images.unsplash.com/photo-1505691938895-1758d7feb511", lighting.getId(), 980000);

        blogPosts.add(new BlogPost(blogId.getAndIncrement(), "راهنمای انتخاب چراغ های تزئینی", "نکاتی برای انتخاب چراغ مناسب فضا", "در این مقاله به معرفی انواع چراغ های تزئینی و کاربرد آن ها می پردازیم.", LocalDate.now().minusDays(2)));
        blogPosts.add(new BlogPost(blogId.getAndIncrement(), "نکات ایمنی در کار با برق", "ایمنی در محیط های صنعتی", "همواره قبل از کار با برق از تجهیزات حفاظتی استفاده کنید.", LocalDate.now().minusDays(5)));
        blogPosts.add(new BlogPost(blogId.getAndIncrement(), "معرفی کابل های پرمصرف", "انتخاب کابل مناسب", "شناخت ساختار کابل ها به انتخاب درست کمک می کند.", LocalDate.now().minusDays(10)));
    }

    public List<Product> getProducts() {
        return products;
    }

    public List<Product> getLatestProducts(int limit) {
        return products.stream()
                .sorted(Comparator.comparing(Product::getId).reversed())
                .limit(limit)
                .toList();
    }

    public Optional<Product> getProductById(Long id) {
        return products.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return products.stream().filter(p -> p.getCategoryId().equals(categoryId)).toList();
    }

    public Product createProduct(String name, String description, String imageUrl, Long categoryId, double price) {
        Product product = new Product(productId.getAndIncrement(), name, description, imageUrl, categoryId, price);
        products.add(product);
        return product;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public List<Category> getLatestCategories(int limit) {
        return categories.stream()
                .sorted(Comparator.comparing(Category::getId).reversed())
                .limit(limit)
                .toList();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categories.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public Category createCategory(String name, String description) {
        Category category = new Category(categoryId.getAndIncrement(), name, description);
        categories.add(category);
        return category;
    }

    public List<BlogPost> getBlogPosts() {
        return blogPosts;
    }

    public List<BlogPost> getLatestBlogPosts(int limit) {
        return blogPosts.stream()
                .sorted(Comparator.comparing(BlogPost::getPublishedDate).reversed())
                .limit(limit)
                .toList();
    }

    public Optional<BlogPost> getBlogPostById(Long id) {
        return blogPosts.stream().filter(b -> b.getId().equals(id)).findFirst();
    }

    public BlogPost createBlogPost(String title, String excerpt, String content, LocalDate publishedDate) {
        BlogPost post = new BlogPost(blogId.getAndIncrement(), title, excerpt, content, publishedDate);
        blogPosts.add(post);
        return post;
    }

    public List<ContactMessage> getContactMessages() {
        return contactMessages;
    }

    public ContactMessage saveContactMessage(ContactMessage message) {
        contactMessages.add(message);
        return message;
    }
}
