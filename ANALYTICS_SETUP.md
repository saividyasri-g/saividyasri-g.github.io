# Analytics Implementation Guide

## Overview
Your portfolio now tracks detailed behavioral analytics using:
- **PostHog** — Session recordings, user behavior, scroll tracking
- **Google Analytics 4** — Traffic sources, UTM parameters, conversions

All tracking code is centralized in `assets/js/analytics.js` for easy maintenance.

---

## Setup Steps

### 1. PostHog Setup (Session Recordings + Behavior)

1. Go to [PostHog.com](https://posthog.com)
2. Sign up for free tier
3. Create a new project for your portfolio
4. Copy your **Project API Key** (looks like `phc_XXXXXXXXXXXXXXX`)
5. In `assets/js/analytics.js`, replace this line:
   ```javascript
   posthog.init('phc_L8ZYjbDVb8e5K7t5E7R5E7R5E7R5E7R5', {
   ```
   with your actual API key

**Backlog:** Add privacy banner & consent notice before going live

---

### 2. Google Analytics 4 Setup (Traffic & UTM Tracking)

1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Create" or use existing account
3. Set up new property for `saividyasrigiridharan.com`
4. Copy your **Measurement ID** (looks like `G-XXXXXXXXXX`)
5. In `assets/js/analytics.js`, replace both instances of `G-XXXXXXXXXX`:
   ```javascript
   gtag('config', 'G-XXXXXXXXXX', {
   ```
   and
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
   (The HTML scripts are already added to all pages)

---

## What's Being Tracked

### PostHog Events (Behavioral)
| Event | When | Context |
|-------|------|---------|
| `scrolled_to_section` | User scrolls past a case study section (problem, solution, etc.) | Section name, project name |
| `resume_clicked` | User clicks resume download link | Page type, project, location |
| `project_card_clicked` | User clicks a project from home | Project name |
| `project_nav_clicked` | User navigates between projects (prev/next) | Direction, current project |
| `sidebar_nav_clicked` | User clicks sidebar navigation on case study | Section clicked, project |
| `external_link_clicked` | User clicks LinkedIn, GitHub, Instagram links | Platform, URL |
| `page_time_milestone` | Every 60 seconds on page | Time elapsed, project |
| `scroll_depth` | At 25%, 50%, 75%, 100% scroll | Depth percent, project |
| `page_exit` | User leaves page | Total time on page, project |

### GA4 Events (Traffic & Conversion)
| Event | Tracks |
|-------|--------|
| `page_view` | All page views (automatic) |
| `scroll_to_section` | Section scrolling (mirrors PostHog) |
| `file_download` | Resume downloads |
| `project_nav_clicked` | Project navigation |

### UTM Parameters Captured
If you share with UTM parameters:
- `?utm_source=linkedin_profile`
- `?utm_source=application`
- `?utm_medium=referral`
- etc.

These are stored in session storage and attached to all events.

---

## Recommended Dashboard Setup

### PostHog Dashboards to Create:
1. **Engagement Overview**
   - Section scroll rates by project
   - Time on page distribution
   - Resume download conversion rate

2. **Traffic Sources**
   - Sessions by referrer
   - UTM source breakdown
   - Geographic distribution

3. **Project Performance**
   - Which projects get the most views
   - Which projects have deepest engagement (scroll depth)
   - Project navigation patterns

### GA4 Reports to Check:
1. **Traffic Sources** → See where visitors come from
2. **User Insights** → Device type, location, language
3. **Events** → Resume downloads, project clicks
4. **Conversion Funnel** (optional) → Set up goal: "Resume Download"

---

## How to Identify Recruiter/Hiring Manager Interest

**Strong Signals:**
- ✅ Scrolled past "problem" section (shows they read the challenge)
- ✅ Scrolled past "solution" section (they understand your work)
- ✅ Visited multiple projects (comprehensive review)
- ✅ Downloaded resume (clear intent)
- ✅ Clicked on LinkedIn/GitHub (checking your background)

**Session Recording Red Flags (Watch the Video):**
- Deep scrolling vs. fast scanning
- Pausing on specific sections
- Revisiting project pages
- Slow deliberate interactions

---

## UTM Strategy for Different Channels

Add these to your shareable links:

**LinkedIn Profile:**
```
https://www.saividyasrigiridharan.com/?utm_source=linkedin_profile&utm_medium=organic
```

**Job Applications:**
```
https://www.saividyasrigiridharan.com/?utm_source=application&utm_medium=job_board&utm_campaign=2026
```

**Shared via Email:**
```
https://www.saividyasrigiridharan.com/?utm_source=email&utm_medium=referral
```

**Resume PDF Link:**
```
https://www.saividyasrigiridharan.com/index.html?utm_source=resume&utm_medium=download
```

---

## Privacy & Future Improvements

### Backlog Items:
1. **Privacy Banner** — Add consent notice before tracking
2. **Do Not Track Compliance** — Respect DNT header (PostHog already does)
3. **GDPR Compliance** — Review data retention policies
4. **Add Contact/Hire CTA** — Track clicks on call-to-action buttons

### Current Privacy Stance:
- PostHog session recordings capture user interactions (including form inputs by default, masked in analytics.js)
- GA4 has anonymize_ip enabled
- No personal data is collected unless explicitly provided (form submissions)

---

## Testing Analytics

1. After deploying, visit your portfolio
2. Scroll through a project page
3. Check PostHog → Session Recordings → Should see your session
4. Check GA4 → Reports → You should appear in real-time traffic

**Pro tip:** Open your portfolio with `?utm_source=test&utm_medium=local` to test UTM capture.

---

## Questions?

- **PostHog Docs:** https://posthog.com/docs
- **GA4 Docs:** https://support.google.com/analytics/answer/10089681
- **Session Recording Tips:** https://posthog.com/docs/features/session-replay
