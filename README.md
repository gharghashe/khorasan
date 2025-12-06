# Khorasan Demo Shop

This repository contains a Spring Boot backend and a Vite/React frontend for a simple product catalog site with blog and admin data entry. The code currently lives only in this local repository — no remote `origin` is configured, which is why the GitHub repository appears empty until a push is performed.

## Project layout
- `backend/` — Spring Boot API providing public catalog/blog endpoints and basic admin content entry routes.
- `frontend/` — React SPA (Vite) with pages for home, products, categories, blog, contact, and a lightweight admin form.
- `.gitignore` — ignores build outputs and node/maven caches.

## Running locally
1. Backend: `cd backend` then `./mvnw spring-boot:run` (or `mvn spring-boot:run` if Maven is installed). The sample data is in-memory.
2. Frontend: `cd frontend` then `npm install && npm run dev`.

## Pushing to GitHub
Add your GitHub repository as the remote and push the existing commits:
```bash
git remote add origin https://github.com/gharghashe/khorasan.git
git push -u origin work
```
After pushing, the files will appear on GitHub under the `work` branch (or create `main` if preferred).
