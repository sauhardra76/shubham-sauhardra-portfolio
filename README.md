# Shubham Sauhardra - IT Professional Portfolio

Enterprise-grade IT Professional & Full-Stack Developer portfolio built with React 19, TypeScript, Tailwind CSS v4, and Vite.

## 🚀 How to Run Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm` or `yarn`

### 2. Installation
Extract the zip file, open your terminal inside the folder, and run:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` or the URL printed in your terminal.

---

## 🌐 How to Host on GitHub (GitHub Pages)

### Method 1: Using GitHub Pages (Automatic with GitHub Actions)

1. Create a new repository on GitHub (e.g. `shubham-portfolio`).
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of IT Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. If hosting on `https://<username>.github.io/<repo-name>/`, set the `base` path in `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: './', // Ensures relative asset paths work anywhere
     // ...
   });
   ```
4. Build the static website:
   ```bash
   npm run build
   ```
   The production-ready static files will be generated in the `dist` folder.
5. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, select **GitHub Actions** (or deploy directly from the `main` branch or a `gh-pages` branch using `gh-pages` package: `npx gh-pages -d dist`).

---

## 🛠️ Project Structure

- `src/`
  - `components/` - Modular UI components:
    - `Navbar.tsx` - IDE-themed navigation header with custom logo support
    - `Hero.tsx` - Professional hero section
    - `About.tsx` - Background, philosophy, and focus cards
    - `Skills.tsx` - Dual-mode technical proficiency visualization (Progress Bars & Radar Chart)
    - `Skills3DSphere.tsx` - Interactive 3D skill architecture sphere
    - `Services.tsx` - Service offerings with interactive inquiry routing
    - `AndroidApps.tsx` - Android application showcases with screenshots
    - `CrmProjects.tsx` - Enterprise CRM and software systems
    - `LiveWebsites.tsx` - Live website contributions
    - `Process.tsx` - 5-step development workflow
    - `Contact.tsx` - Project inquiry form and direct communication channels
    - `UploadLogoModal.tsx` - Custom logo upload and preview modal
    - `Footer.tsx` - Footer with quick navigation and contact details
  - `config/`
    - `portfolioData.ts` - Central configuration file containing all personal details, services, skills, apps, and project data.
  - `hooks/`
    - `useCustomLogo.ts` - Reactive hook for logo customization and persistence.
  - `utils/`
    - `logoStorage.ts` - Local storage management for user-uploaded brand images.
- `public/` - Static assets, screenshots, `robots.txt`, and `sitemap.xml`.
