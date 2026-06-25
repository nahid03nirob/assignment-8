# QurbaniHat

QurbaniHat is a modern single-page livestock booking platform for Eid-ul-Adha. Users can browse animals, view full details, and place booking requests after a simple login or registration flow.

## Features
- Responsive home page with hero section and featured animals
- Full animals listing with price sorting
- Animal details page with booking form
- Login and registration flow with local session persistence
- Profile page and update profile form
- Toast notifications and not-found page

## Live Demo
- Local preview: http://localhost:3000
- Deployment-ready for Vercel or Netlify

## Tech Stack
- Vite
- Vanilla JavaScript
- CSS

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables
Create a .env file using the sample below:

```env
VITE_APP_TITLE=QurbaniHat
VITE_APP_DESCRIPTION=A modern livestock marketplace for Qurbani booking.
VITE_APP_URL=http://localhost:3000
```
