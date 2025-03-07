<div align="center">
  <img src="https://github.com/user-attachments/assets/c859ce85-3a20-40ea-9cae-fab5f34988da" alt="Amurex Logo" width="800" />


  <h2>Amurex Web</h2>

  <p>
    <a href="https://github.com/thepersonalaicompany/amurex/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="License" />
    </a>
    <a href="https://chrome.google.com/webstore/detail/amurex/dckidmhhpnfhachdpobgfbjnhfnmddmc">
      <img src="https://img.shields.io/chrome-web-store/v/dckidmhhpnfhachdpobgfbjnhfnmddmc.svg" alt="Chrome Web Store" />
    </a>
    <a href="https://twitter.com/thepersonalaico">
      <img src="https://img.shields.io/twitter/follow/thepersonalaico?style=social" alt="Twitter Follow" />
    </a>
    <a href="https://discord.gg/ftUdQsHWbY">
      <img alt="Discord" src="https://img.shields.io/discord/1306591395804348476">
    </a>
  </p>
</div>



## Amurex Web

This is the web interface for the Amurex project. It serves as the web app for viewing and managing previous meetings, built with Next.js.

## Prerequisites

- Node.js 18+

- npm, yarn, or pnpm

## Getting Started

First, clone the repository:
```
git clone https://github.com/thepersonalaicompany/amurex-web
cd amurex-web
```

Create a .env.local file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
SUPABASE_URL=
OPENAI_API_KEY=
NEXT_PUBLIC_BASE_URL=
```

### Installation

1. Install dependencies:
```
npm install  # or yarn install or pnpm install
```

2. Run the development server:

```
npm run dev  # or yarn dev or pnpm dev
```

3. Open http://localhost:3000 in your browser.

### Building for Production

To create an optimized production build:
```
npm run build
```

To start the production server:
```
npm run start
```

### Learn More

To learn more about Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs)

- [Learn Next.js](https://nextjs.org/docs)

