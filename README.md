# JOBSPHEERE - Find Your Dream Job with Ease
link of video 
https://youtu.be/eDT5fuK0JEA?si=kIl0FSPkJTRzOUbi

Welcome to **JOBSPHEERE**, a modern job search platform designed to connect talented professionals with their next big opportunity. This application is built with a focus on speed, security, and a seamless user experience.

## 🚀 Features

- **Real-time Job Search**: Find jobs by title, keywords, or location.
- **Secure Authentication**: 
  - Email and Password signup/login.
  - **Email Verification**: Mandatory verification to ensure a high-quality community.
  - Social Login: Quick access via Google.
- **User Profiles**: Personalized profiles for job seekers.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Modern UI/UX**: Built with Tailwind CSS and smooth animations using Motion.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database & Auth**: Firebase (Firestore & Authentication)
- **Icons**: Lucide React
- **Animations**: Motion (formerly Framer Motion)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd jobspheere
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your Firebase configuration (see `.env.example` for reference).

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.
   

## 🛡️ Security

We take security seriously. Our application implements:
- **Firestore Security Rules**: Strict "Default Deny" policy. Users can only access their own PII (Personally Identifiable Information).
- **Input Validation**: Server-side and client-side validation for all user inputs.
- **Role-Based Access Control (RBAC)**: Defined roles for Job Seekers, Employers, and Admins to ensure proper data isolation.

## 📄 License
    
This project is licensed under the MIT License.






*Built with ❤️ by Eman Abdulsemed*
