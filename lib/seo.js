// lib/seo.js
export const SEO = {
  "/": { title: "Home | Mikell Milton", description: "Official site of Mikell Milton." },
  "/about-us": { title: "About Us | Mikell Milton", description: "Learn more about Mikell Milton and the mission." },
  "/about-book": { title: "About Book | Mikell Milton", description: "Overview, themes, and background of the book." },
  "/contact": { title: "Contact | Mikell Milton", description: "Get in touch." },
  "/shop": { title: "Shop | Mikell Milton", description: "Browse and purchase." },
  "/cart": { title: "Cart | Mikell Milton", description: "Your selected items." },
  "/checkout": { title: "Checkout | Mikell Milton", description: "Secure checkout." },
  "/download": { title: "Download Page | Mikell Milton", description: "Access your downloads." },
  "/privacy-policy": { title: "Privacy Policy | Mikell Milton", description: "How we collect, use, and protect your data." },
  "/terms-and-conditions": { title: "Terms & Conditions | Mikell Milton", description: "The terms that govern your use of this site." },
  "/licensing-inquiry": { title: "Licensing Inquiry | Mikell Milton", description: "Request details for licensing the EB-Album and E-Book." },
};

export function downloadSEO(id) {
  return {
    title: `Download ${id} | Mikell Milton`,
    description: "Access your download.",
  };
}
