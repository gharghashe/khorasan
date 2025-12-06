package com.example.khorasan.model;

import java.time.LocalDate;

public class BlogPost {
    private Long id;
    private String title;
    private String excerpt;
    private String content;
    private LocalDate publishedDate;

    public BlogPost() {
    }

    public BlogPost(Long id, String title, String excerpt, String content, LocalDate publishedDate) {
        this.id = id;
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.publishedDate = publishedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
    }
}
