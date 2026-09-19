# CloudyMountains

A clean, minimal Hugo theme for personal portfolio and blog sites. Built for tech professionals — showcasing skills, projects, a CV, and a blog in one cohesive layout.

[![Demo](https://img.shields.io/badge/demo-cloudymountains.cloud-blue)](https://cloudymountains.cloud)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/cloudymountains/cloudymountains-theme/blob/main/LICENSE)
[![Hugo](https://img.shields.io/badge/Hugo-%3E%3D0.146.0-ff4088)](https://gohugo.io/)

![CloudyMountains Theme Screenshot](https://raw.githubusercontent.com/cloudymountains/cloudymountains-theme/main/images/screenshot.png)

## Features

- **Hero section** — full-screen hero with configurable background image, title and subtitle, and drifting cloud layers that react to the mouse (respects reduced-motion)
- **About section** — animated counters for years of experience, companies, projects, and technologies
- **Skills section** — animated progress bars for each skill
- **Projects showcase** — grid of recent projects pulled from the `projects/` content section
- **CV page** — dedicated layout with experience, education, certifications, languages, skills, projects, philosophy and a "My Time" donut chart
- **Bookshelf** — optional reading list in the contacts section: books that turn to show their cover and link to Amazon, configured in `hugo.toml`
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
  heroClouds = true                       # drifting clouds with mouse parallax over the hero (default true)

  # About section
  about_title = "About Me"
  about_text = "Your bio goes here."
  profile_image = "/images/profile.jpg"   # optional; place it in assets/images/ (not static/) to get resized WebP versions

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

  # Skills bars (shown on home and CV pages). A bar links to its tag page
  # (/tags/<name>/) when posts use that tag; set `tag` if the tag is named differently.
  [[params.skills]]
    name = "Kubernetes"
    percent = 85
    # tag = "k8s"                  # optional
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

## Bookshelf

An optional reading list shown in the home page's contacts section, under the contact buttons. Books stand spine-out on glass shelves and turn to reveal their covers. It is driven entirely by config: when `[params.books]` has at least one item, the shelf replaces the four topic tiles (`first_title` … `fourth_text`). Remove the section (or set `enable = false`) and the tiles come back.

```toml
[params.books]
  # eyebrow = "Reading list"      # optional: label above the shelf
  # enable = false                # optional: hide the shelf without deleting the list

  [[params.books.items]]
    title = "The Phoenix Project"
    author = "Gene Kim, Kevin Behr, George Spafford"
    cover = "/images/books/the-phoenix-project.jpg"   # in static/, or a full URL
    url = "https://www.amazon.com/dp/1942788290"      # optional: the cover links here
    # spine_color = "#1f2a3d"   # optional: spine colour (defaults cycle through a palette)
    # spine_text = "#ddd8cc"    # optional: spine text colour
    # spine_author = "Kim"      # optional: name on the spine (default: first author's surname)
    # thickness = 42            # optional: spine width in px (default: 30–50, derived from the title)
```

Books stand spine-out on the shelf. Hovering (or keyboard focus) turns a book to show its cover, and clicking the book opens its `url`. On touch screens, the first tap opens a book and the second follows the link. Covers display at a 2:3 ratio (150×225 on desktop). A book without a `cover` shows a styled title card in its spine colour. A book without a `url` is not clickable.

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
