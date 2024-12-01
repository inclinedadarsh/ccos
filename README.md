# Content Creation on Steroids (CCoS)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/inclinedadarsh/ccos/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/inclinedadarsh/ccos/pulls)
[![Contributors](https://img.shields.io/github/contributors/inclinedadarsh/ccos)](https://github.com/inclinedadarsh/ccos/graphs/contributors)

</div>

**CCoS (Content Creation on Steroids)** is an open-source AI platform that automates content creation and distribution. It transforms uploaded videos into engaging social media posts, blogs, and personalized Discord announcements. Built on **Kestra's powerful automation**, CCoS ensures creators can focus on their craft while we handle the distribution seamlessly.

## 🌟 Features

- **Instant Social Media and Blog Content**: Automatically generates platform-specific posts for Twitter, LinkedIn, and blogs when a new video is uploaded.
- **Discord Community Announcements**: Sends personalized notifications to the creator's Discord server to keep followers engaged.
- **Content from Old Videos**: Easily repurpose older videos into fresh, engaging content within seconds.
- **Kestra-Powered Automation**: Seamlessly handles the automation process.

### Kestra Automation Flowchart

```mermaid
flowchart TD
    A[Start] --> B{Loop Condition}
    B -->|Iteration Count < 10000| C[Fetch Latest Video]
    C --> D[Parse Video ID]
    D --> E[Get Supabase Video ID]
    
    E --> F{Is Supabase Video ID Empty?}
    F -->|Yes| G[Save Video ID to Supabase]
    
    F -->|No| H{Is New Video Different?}
    H -->|Yes| I[Send Discord Notification]
    I --> J[Request Content Generation]
    J --> K[Update Supabase with New Video ID]
    
    H -->|No| B
    G --> B
    K --> B
    
    B -->|Iteration Count = 10000| L[End]
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Bun (for backend)
- Clerk account
- Kestra account
- Supabase account
- Google AI (Gemini) API key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
bun install
bun run dev
```

### Environment Variables

#### Frontend (.env)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

#### Backend (.env)

```
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
SUPABASE_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_api_key
```

## 📝 Documentation

### Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Hono.js with Bun runtime
- **Database**: Supabase
- **Authentication**: Clerk
- **AI**: Google Gemini
- **Automation**: Kestra

### API Endpoints

- `GET /api/dashboard`: Get user dashboard data
- `GET /get_video_stats`: Get YouTube video statistics
- `GET /get_latest_videos`: Fetch latest videos from a channel
- `GET /api/get_content`: Generate content from video

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built by [Sushant](https://x.com/sushantstwt), [Aditya](https://x.com/adityab29_), and [Adarsh](https://x.com/inclinedadarsh)

## 📞 Support

- Create a [GitHub Issue](https://github.com/inclinedadarsh/ccos/issues) for bug reports and feature requests

---

<div align="center">
Made with ❤️ by the three musketeers
</div>
```