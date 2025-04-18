# Next.js Authentication with Interactive Background

This is a **Next.js** project deployed on **Vercel** *[sanskar-next-auth.vercel.app/](https://sanskar-next-auth.vercel.app/)* featuring:

- Custom-built **authentication system** (no pre-built UI components from auth libraries)
- Protected **Dashboard** page
- **Logout** functionality
- A **public route** with an **interactive background gradient** that responds to mouse movement.

---

### 🔒 Authentication System

Authentication is implemented using **[Clerk](https://clerk.dev)** without using pre-built UI components. All forms and flows are built with **custom UI**.

### 🌟 Features

- **Custom Auth Pages**
  - Custom Login Page (`/login`)
  - Custom Login Page (`/sign-up`)
- **Logout functionality**
- **Protected Dashboard Page** (`/dashboard`)
  - Accessible **only** after login
- **Manual integration with Clerk SDK**
  - Using `signIn`, `setActive`, and `signOut` programmatically

---

### ⚙️ Getting Started

##### Clone the repo
```bash
git clone https://github.com/sanskarajput/Next-Auth.git
```

##### Navigate to project directory
```bash
cd Next-Auth
```

##### Install required dependencies
```bash
npm i
```

##### run the server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

<div align=center>

Thank you ❤️

</div>