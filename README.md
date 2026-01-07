# Chip Master 🚀

**Chip Master** is a cutting-edge, mobile-first web application designed for electronics professionals and hobbyists. It serves as a premium marketplace for original mobile phone motherboards and a powerful camera-based diagnostic tool.

Built with performance and aesthetics in mind, Chip Master delivers a native-app-like experience directly in the browser, featuring a stunning glassmorphism UI, seamless dark mode, and integrated text recognition (OCR) capabilities.

![Chip Master Banner](https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-1.png)

## 🌟 Key Features

*   **📱 Mobile-First Design**: Optimized touch targets, vertical layouts, and a "Chip-Master" native-feel navigation ensure a flawless experience on phone devices.
*   **📷 Camera-Based Scanning**: Integrated with **Tesseract.js**, the scanning feature allows users to photograph motherboard components to instantly extract part codes for direct database searching.
*   **🔍 Automated Search**: Quickly search the local database or perform a web search directly from captured text to diagnose potential faults.
*   **🎨 Premium UI/UX**:
    *   **Glassmorphism**: Modern, translucent interface elements.
    *   **Dark Mode**: Fully supported system-wide dark theme with instant toggling.
    *   **Animations**: Smooth transitions powered by `framer-motion`.
    *   **Interactive Marquee**: Auto-scrolling brand showcase for trusted partners.
*   **🛍️ E-Commerce Ready**: A dedicated catalog for browsing and ordering original phone parts (Apple, Samsung, Xiaomi, etc.).
*   **🔒 Secure Authentication**: Robust Login and Registration flows using Firebase/Auth.

## 🛠️ Tech Stack

**Frontend Framework**
*   ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React 19**
*   ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) **Vite**

**Styling & UI**
*   ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS v4**
*   **Lucide React** (Icons)
*   **Framer Motion** (Animations)

**Data & Infrastructure**
*   **Tesseract.js** (Client-Side OCR)
*   **Firebase** (Authentication & Database)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/chip-master.git
    cd chip-master
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key_here
    # Add other firebase config keys as needed
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```bash
src/
├── assets/         # Static assets (images, brands, icons)
├── components/     # Reusable UI components (NavBar, Button, SliderCompany, etc.)
├── contexts/       # React Contexts (ThemeContext, DatabaseContext)
├── hooks/          # Custom Hooks (useScanner, useChipSearch)
├── pages/          # Application Routes
│   ├── Auth/       # Login & Register
│   ├── Home.jsx    # Landing/Hero Page
│   ├── Serves.jsx  # Tablet/Chip Scanner Module
│   ├── About.jsx   # Company Info
│   ├── Contact.jsx # Contact Form
│   └── Order.jsx   # Product Catalog
├── services/       # External services (OCR Service)
├── App.jsx         # Main App Layout & Routing
└── main.jsx        # Entry Point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by Chip Master Team
</p>
