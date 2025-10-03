// lib/seo.js
export const SEO = {
  "/": { title: "Home | DBT Franchise", description: "Official site of DBT Franchise." },
  "/about-us": { title: "About Us | DBT Franchise", description: "Learn more about DBT Franchise and the mission." },
  "/about-book": { title: "About Book | DBT Franchise", description: "Overview, themes, and background of the book." },
  "/contact": { title: "Contact | DBT Franchise", description: "Get in touch." },
  "/shop": { title: "Shop | DBT Franchise", description: "Browse and purchase." },
  "/cart": { title: "Cart | DBT Franchise", description: "Your selected items." },
  "/checkout": { title: "Checkout | DBT Franchise", description: "Secure checkout." },
  "/download": { title: "Download Page | DBT Franchise", description: "Access your downloads." },
  "/privacy-policy": { title: "Privacy Policy | DBT Franchise", description: "How we collect, use, and protect your data." },
  "/terms-and-conditions": { title: "Terms & Conditions | DBT Franchise", description: "The terms that govern your use of this site." },
  "/licensing-inquiry": { title: "Licensing Inquiry | DBT Franchise", description: "Request details for licensing the EB-Album and E-Book." },
};

export function downloadSEO(id) {
  return {
    title: `Download ${id} | DBT Franchise`,
    description: "Access your download.",
  };
}
