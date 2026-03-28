# CloudyMountains

A clean, minimal Hugo theme for personal portfolio and blog sites. Built for tech professionals — showcasing skills, projects, a CV, and a blog in one cohesive layout.

[![Demo](https://img.shields.io/badge/demo-cloudymountains.cloud-blue)](https://cloudymountains.cloud)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/cloudymountains/cloudymountains-theme/blob/main/LICENSE)
[![Hugo](https://img.shields.io/badge/Hugo-%3E%3D0.146.0-ff4088)](https://gohugo.io/)

![CloudyMountains Theme Screenshot](https://raw.githubusercontent.com/cloudymountains/cloudymountains-theme/main/images/screenshot.png)

## Features

- **Hero section** — full-screen hero with configurable background image, title and subtitle
- **About section** — animated counters for years of experience, companies, projects, and technologies
- **Skills section** — animated progress bars for each skill
- **Projects showcase** — grid of recent projects pulled from the `projects/` content section
- **CV page** — dedicated layout with experience, education, certifications, languages, skills, projects, philosophy and a "My Time" donut chart
- **Blog** — posts with reading progress bar, code copy button, syntax highlighting (Monokai), and share buttons
- **Full-text search** — client-side search powered by a JSON index
- **Dark / Light mode** — toggle persisted in localStorage
- **Tags & taxonomy** — tag pages with tag-search filtering
- **SEO** — Open Graph, meta description, Google Analytics, Google Search Console verification, and optional Iubenda cookie consent manager
- **Responsive** — mobile-first layout
- **RSS feed** — auto-generated

## Demo

[https://cloudymountains.cloud](https://cloudymountains.cloud)

## Requirements

- Hugo **extended** `>= 0.146.0` (SCSS compilation required)

## Installation

### As a Hugo Module (recommended)

1. Initialize Hugo modules in your site (if not already done):

```bash
hugo mod init github.com/your-username/your-site
```

2. Add the theme to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/cloudymountains/cloudymountains-theme"
```

3. Fetch the module:

```bash
hugo mod get github.com/cloudymountains/cloudymountains-theme
```

### As a Git Submodule

```bash
git submodule add https://github.com/cloudymountains/cloudymountains-theme themes/cloudymountains-theme
```

Then set `theme = 'cloudymountains-theme'` in your `hugo.toml`.

### Manual Download

Download or clone the repository into your `themes/` directory.

## Configuration

Below is a full `hugo.toml` example with all available parameters:

```toml
baseURL = 'https://example.com/'
languageCode = 'en-us'
title = 'Your Site Title'
theme = 'cloudymountains-theme'

[params]
  description = "Your site description"
  heroBackgroundImage = "/images/your-hero.jpg"
  heroTitle = "Hello, I'm Your Name"
  heroSubtitle = "Cloud · DevOps · Platform Engineering"

  # About section
  about_title = "About Me"
  about_text = "Your bio goes here."
  profile_image = "/images/profile.jpg"   # optional

  # Animated counters
  experience_start_year = 2018   # years of experience = current year − this
  companies_count = 5
  counter_three_label = "Projects"
  counter_three_value = 30
  counter_four_label = "Technologies"

  # Social / contact
  linkedin = "https://linkedin.com/in/yourusername"
  email = "you@example.com"
  github = "https://github.com/yourusername"

  # Skills bars (shown on home and CV pages)
  [[params.skills]]
    name = "Kubernetes"
    percent = 85
  [[params.skills]]
    name = "Terraform"
    percent = 90

  # Contact topics grid (links to tag pages)
  first_title = "Cloud"
  first_text = "Expertise in cloud infrastructure and services"
  second_title = "Automation"
  second_text = "Streamlining processes through automation"
  third_title = "DevOps"
  third_text = "Bridging development and operations"
  fourth_title = "Platform Engineering"
  fourth_text = "Building robust and scalable platforms"

  [params.seo]
    googleAnalytics = "G-XXXXXXXXXX"
    googleSiteVerification = "your-verification-code"
    keywords = ["cloud", "devops", "platform engineering"]
    author = "Your Name"
    copyright = "© 2024 Your Name. All rights reserved."

    # Optional: Iubenda cookie consent
    [params.seo.iubenda]
      enable = false
      siteId = "your-site-id"
      cookiePolicyId = "your-cookie-policy-id"
      lang = "en"

[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "About"
    url = "/#about"
    weight = 2
  [[menu.main]]
    name = "Projects"
    url = "/#projects"
    weight = 3
  [[menu.main]]
    name = "CV"
    url = "/cv/"
    weight = 4
  [[menu.main]]
    name = "Contacts"
    url = "/#contacts"
    weight = 5

[module]
  [module.hugoVersion]
    extended = true
    min = '0.146.0'

[outputs]
  home = ["HTML", "RSS", "JSON"]

[markup]
  [markup.goldmark.renderer]
    unsafe = true
  [markup.highlight]
    noClasses = false
    style = 'monokai'
```

## CV Page

Create `content/cv/index.md` with the `cv` layout:

```yaml
---
layout: cv
title: "CV"
name: "Your Name"
professional_title: "Senior Cloud Engineer"
email: "you@example.com"
website: "https://example.com"
location: "City, Country"
summary: "Brief professional summary."

experience:
  - role: "Senior Platform Engineer"
    company: "ACME Corp"
    period: "2022 – present"
    location: "Remote"
    bullets:
      - "Led migration of 50+ services to Kubernetes"
      - "Reduced infrastructure costs by 30%"

education:
  - degree: "B.Sc. Computer Science"
    school: "University of Technology"
    period: "2014 – 2018"

certifications:
  - name: "Certified Kubernetes Administrator (CKA)"
    credential_id: "LF-abc123"

languages:
  - language: "English"
    level: "Native"
  - language: "German"
    level: "Intermediate"

skills_list:
  - Kubernetes
  - Terraform
  - AWS
  - Python

my_time:
  - label: "Work"
    text: "Engineering & infra"
    percent: 40
  - label: "OSS"
    text: "Open-source projects"
    percent: 20
  - label: "Family"
    text: "Time with family"
    percent: 25
  - label: "Hobbies"
    text: "Hiking & photography"
    percent: 15
---
```

## Content Structure

```
content/
├── posts/          # Blog posts
├── projects/       # Project pages (shown on home and /projects)
└── cv/
    └── index.md    # CV page
```

### Project front matter

```yaml
---
title: "My Project"
description: "Short description shown in the card"
image: "cover.jpg"    # relative to the project directory
tags: ["kubernetes", "terraform"]
date: 2024-01-15
---
```

## License

[MIT](https://github.com/cloudymountains/cloudymountains-theme/blob/main/LICENSE) © 2024 [Denislav Tsonev](https://cloudymountains.cloud)
