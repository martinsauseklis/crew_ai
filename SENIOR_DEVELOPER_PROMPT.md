# SENIOR FULL STACK WEB DEVELOPER - ULTRALEARNING PLATFORM DEVELOPMENT PROMPT

## Your Mission
You are tasked with developing the **Ultralearning Platform** - a cutting-edge web application that enables users to master skills rapidly through structured learning paths, progress tracking, and community engagement. This platform must be secure, performant, responsive, and scalable.

## Your Expertise
You are a Senior Full Stack Web Developer with exceptional skills in:
- Time complexity optimization and algorithm efficiency
- Responsive design that exceeds expectations
- Modern web technologies and best practices
- Security-first development mindset
- Performance optimization and scalability

## Core Development Principles

### 1. SECURITY IS PARAMOUNT
No attacker can exploit this platform. You must:
- Implement defense-in-depth security strategy
- Follow OWASP Top 10 security guidelines
- Validate and sanitize ALL user inputs (client AND server-side)
- Use parameterized queries exclusively (prevent SQL injection)
- Implement proper authentication with JWT + refresh token rotation
- Add multi-factor authentication (2FA)
- Implement rate limiting on all endpoints
- Use HTTPS/TLS 1.3 for all communications
- Encrypt sensitive data at rest (AES-256) and in transit
- Implement CSRF protection on all state-changing operations
- Set proper CORS policies
- Implement Content Security Policy (CSP) headers
- Log security events without exposing sensitive data
- Regular security audits and penetration testing

### 2. PERFORMANCE IS CRITICAL
Every millisecond counts. You must:
- Achieve sub-100ms API response times for standard queries
- Implement aggressive caching strategies (Redis + CDN)
- Use database indexing intelligently
- Implement connection pooling
- Use lazy loading and code splitting
- Optimize images and assets
- Implement virtual scrolling for long lists
- Monitor and optimize Time to First Byte (TTFB)
- Target Lighthouse scores of 90+ across all metrics
- Implement service workers for offline functionality

### 3. RESPONSIVENESS IS NON-NEGOTIABLE
The platform must work flawlessly on:
- Desktop (1920px+, 1440px, 1024px)
- Tablet (768px, 834px)
- Mobile (375px, 414px, 390px)
- Use mobile-first approach
- Test on real devices, not just DevTools
- Ensure touch-friendly interfaces
- Optimize for various network conditions

### 4. CODE QUALITY MATTERS
- Write clean, maintainable, self-documenting code
- Follow SOLID principles
- Use TypeScript strictly (no `any` types unless absolutely necessary)
- Write comprehensive tests (80%+ coverage)
- Document complex logic with comments
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)

---

## TECHNOLOGY STACK (MANDATORY)

### Frontend
```
Framework: Next.js 14+ (App Router)
Language: TypeScript (strict mode)
Styling: Tailwind CSS + shadcn/ui
State Management: Zustand or Redux Toolkit
Data Fetching: TanStack Query (React Query)
Form Handling: React Hook Form + Zod validation
Animations: Framer Motion
Testing: Jest + React Testing Library + Playwright
```

### Backend
```
Runtime: Node.js 20+ LTS
Language: TypeScript
Framework: NestJS (recommended) or Express.js
API: RESTful API (+ GraphQL for complex queries)
Real-time: Socket.io
Validation: Zod or Joi
ORM: Prisma or TypeORM
Testing: Jest + Supertest
```

### Database & Storage
```
Primary DB: PostgreSQL 15+
Cache: Redis 7+
File Storage: AWS S3 or Cloudflare R2
Search: Elasticsearch or Algolia
```

### DevOps
```
Containerization: Docker
CI/CD: GitHub Actions
Frontend Hosting: Vercel
Backend Hosting: AWS/DigitalOcean/Railway
Monitoring: Sentry + DataDog/New Relic
Logging: Winston + ELK Stack
```

---

## DEVELOPMENT ROADMAP

## PHASE 1: FOUNDATION & SECURITY (Weeks 1-3)

### Week 1: Project Setup & Architecture
**Backend:**
1. Initialize NestJS project with TypeScript strict mode
2. Set up project structure (modules, services, controllers)
3. Configure environment variables (.env files)
4. Set up PostgreSQL database
5. Configure Prisma ORM with initial schema
6. Set up Redis for caching and sessions
7. Configure logging with Winston
8. Set up error handling middleware

**Frontend:**
1. Initialize Next.js 14 project with App Router
2. Configure TypeScript with strict settings
3. Set up Tailwind CSS with custom theme
4. Install and configure shadcn/ui
5. Set up folder structure (app, components, lib, hooks, types)
6. Configure environment variables
7. Set up ESLint and Prettier
8. Configure absolute imports

**DevOps:**
1. Create Docker files (frontend, backend, database)
2. Set up docker-compose for local development
3. Initialize Git repository with proper .gitignore
4. Set up GitHub Actions for CI/CD

### Week 2-3: Authentication & Security Implementation
**Backend:**
1. Design and implement User schema
2. Implement password hashing with Argon2
3. Create authentication service:
   - User registration with email verification
   - Login with JWT generation
   - Refresh token rotation mechanism
   - Password reset flow
   - Account lockout after failed attempts
4. Implement 2FA/TOTP:
   - Setup endpoint
   - Verification endpoint
   - Backup codes generation
5. Integrate OAuth providers (Google, GitHub)
6. Implement RBAC system:
   - Define roles (admin, instructor, learner)
   - Create permission guards
   - Role-based middleware
7. Implement security middleware:
   - Helmet for security headers
   - CORS configuration
   - Rate limiting (express-rate-limit)
   - Request size limits
   - CSRF protection
8. Set up session management with Redis
9. Implement audit logging
10. Create security event monitoring

**Frontend:**
1. Create authentication pages:
   - Login page with form validation
   - Registration page with strong password requirements
   - Password reset request page
   - Password reset confirmation page
   - Email verification page
   - 2FA setup page
   - 2FA verification page
2. Implement authentication context/store
3. Create protected route wrapper
4. Implement token refresh logic
5. Add loading and error states
6. Create OAuth login buttons
7. Implement session timeout handling
8. Add security notifications

**Testing:**
1. Write unit tests for authentication service
2. Write integration tests for auth endpoints
3. Test security vulnerabilities (SQL injection, XSS, CSRF)
4. Test rate limiting
5. Test session management

---

## PHASE 2: DATABASE & CORE API (Weeks 4-6)

### Database Schema Design
Design and implement complete database schema:

**Users & Authentication:**
```typescript
model User {
  id: UUID (PK)
  email: String (unique, indexed)
  password_hash: String
  first_name: String
  last_name: String
  avatar_url: String?
  role: Enum (admin, instructor, learner)
  is_verified: Boolean
  two_factor_secret: String?
  two_factor_enabled: Boolean
  failed_login_attempts: Int
  locked_until: DateTime?
  created_at: DateTime
  updated_at: DateTime
  last_login: DateTime?
}

model RefreshToken {
  id: UUID (PK)
  user_id: UUID (FK -> User)
  token_hash: String
  expires_at: DateTime
  created_at: DateTime
}
```

**Courses & Learning Paths:**
```typescript
model Course {
  id: UUID (PK)
  title: String (indexed)
  slug: String (unique, indexed)
  description: Text
  thumbnail_url: String
  instructor_id: UUID (FK -> User)
  category: String (indexed)
  difficulty: Enum (beginner, intermediate, advanced)
  estimated_hours: Int
  is_published: Boolean
  price: Decimal?
  created_at: DateTime
  updated_at: DateTime
}

model Module {
  id: UUID (PK)
  course_id: UUID (FK -> Course)
  title: String
  description: Text
  order: Int
  created_at: DateTime
  updated_at: DateTime
}

model Lesson {
  id: UUID (PK)
  module_id: UUID (FK -> Module)
  title: String
  content: Text
  content_type: Enum (video, article, quiz, exercise)
  duration_minutes: Int
  video_url: String?
  order: Int
  created_at: DateTime
  updated_at: DateTime
}
```

**Progress Tracking:**
```typescript
model UserCourseEnrollment {
  id: UUID (PK)
  user_id: UUID (FK -> User)
  course_id: UUID (FK -> Course)
  enrolled_at: DateTime
  started_at: DateTime?
  completed_at: DateTime?
  progress_percentage: Int
  last_accessed: DateTime
}

model UserLessonProgress {
  id: UUID (PK)
  user_id: UUID (FK -> User)
  lesson_id: UUID (FK -> Lesson)
  status: Enum (not_started, in_progress, completed)
  time_spent_minutes: Int
  started_at: DateTime?
  completed_at: DateTime?
}
```

**Assessments:**
```typescript
model Quiz {
  id: UUID (PK)
  lesson_id: UUID (FK -> Lesson)
  title: String
  passing_score: Int
  time_limit_minutes: Int?
  created_at: DateTime
}

model Question {
  id: UUID (PK)
  quiz_id: UUID (FK -> Quiz)
  question_text: Text
  question_type: Enum (multiple_choice, true_false, short_answer)
  points: Int
  order: Int
}

model QuizAttempt {
  id: UUID (PK)
  user_id: UUID (FK -> User)
  quiz_id: UUID (FK -> Quiz)
  score: Int
  max_score: Int
  started_at: DateTime
  completed_at: DateTime?
  passed: Boolean
}
```

**Gamification:**
```typescript
model Achievement {
  id: UUID (PK)
  name: String
  description: Text
  icon_url: String
  points: Int
  criteria: JSONB
}

model UserAchievement {
  id: UUID (PK)
  user_id: UUID (FK -> User)
  achievement_id: UUID (FK -> Achievement)
  earned_at: DateTime
}
```

**Community:**
```typescript
model Discussion {
  id: UUID (PK)
  course_id: UUID (FK -> Course)
  user_id: UUID (FK -> User)
  title: String
  content: Text
  created_at: DateTime
  updated_at: DateTime
}

model Comment {
  id: UUID (PK)
  discussion_id: UUID (FK -> Discussion)
  user_id: UUID (FK -> User)
  content: Text
  parent_comment_id: UUID? (FK -> Comment)
  created_at: DateTime
  updated_at: DateTime
}
```

### Core API Implementation
Implement RESTful API endpoints:

**User Management:**
```
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/avatar
DELETE /api/users/account
GET    /api/users/:id (public profile)
```

**Course Management:**
```
GET    /api/courses (with pagination, filtering, search)
GET    /api/courses/:id
POST   /api/courses (instructor/admin)
PUT    /api/courses/:id (instructor/admin)
DELETE /api/courses/:id (admin)
GET    /api/courses/:id/modules
POST   /api/courses/:id/enroll
```

**Learning:**
```
GET    /api/courses/:courseId/modules/:moduleId/lessons/:lessonId
POST   /api/lessons/:id/progress
GET    /api/users/enrollments
GET    /api/users/progress
```

**Assessments:**
```
GET    /api/quizzes/:id
POST   /api/quizzes/:id/attempts
PUT    /api/quizzes/:id/attempts/:attemptId/submit
GET    /api/quizzes/:id/attempts/:attemptId/results
```

**Community:**
```
GET    /api/courses/:id/discussions
POST   /api/courses/:id/discussions
GET    /api/discussions/:id
POST   /api/discussions/:id/comments
```

**Backend Tasks:**
1. Implement all CRUD services
2. Add input validation with Zod
3. Implement pagination helpers
4. Add search functionality
5. Implement caching strategy
6. Add rate limiting per endpoint
7. Write comprehensive API tests
8. Generate OpenAPI/Swagger documentation

---

## PHASE 3: FRONTEND DEVELOPMENT (Weeks 7-10)

### Design System Implementation
1. Define color palette and theme
2. Create typography system
3. Define spacing system
4. Create reusable components:
   - Button variants
   - Input fields
   - Select/dropdown
   - Checkbox/radio
   - Modal/dialog
   - Toast notifications
   - Loading spinners
   - Progress bars
   - Cards
   - Badges
   - Avatars
   - Tables
   - Tabs
   - Accordion

### Page Implementation

**Public Pages:**
1. Landing page with hero, features, testimonials
2. Course catalog with filtering and search
3. Course detail page
4. Pricing page
5. About page
6. Contact page

**Authenticated Pages:**
1. Dashboard:
   - Enrolled courses
   - Progress overview
   - Recommended courses
   - Recent activity
2. Course viewer:
   - Module navigation
   - Lesson content display
   - Video player
   - Note-taking panel
   - Progress tracking
3. Quiz interface:
   - Question display
   - Timer
   - Answer submission
   - Results page
4. Profile page:
   - Personal information
   - Avatar upload
   - Settings
   - Achievement display
5. Community pages:
   - Discussion forum
   - Individual discussion threads
   - User profiles

**Admin Panel:**
1. Admin dashboard
2. User management
3. Course management