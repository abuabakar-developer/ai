'use client';

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import HeroSection from "./Hero";
import { Toaster } from "react-hot-toast";
import Chatbot from "./Chatbot";
import HowItWorks from "./HowItWorks";
import CreateNewChatbot from "./CreateNewChatbot";
import ChatbotFeatures from "./ChatbotFeatures";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import Footer from "./Footer";


export default function ClientWrapper() {
  const pathname = usePathname();

  const isHiddenPage =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/booking') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/reset-password')||
    pathname.startsWith('/chatbots')||
    pathname.startsWith('/pricing');

  return (
    <>
      {!isHiddenPage ? (
        <>
          <Navbar />
          <HeroSection />
          <ChatbotFeatures />
          <HowItWorks />
          <CreateNewChatbot />
          <Pricing />
          <FAQ />
          <Chatbot
            businessName="Talksy AI"
            primaryColor="#16a34a"
            welcomeMessage="Hi! How can I assist you today?"
          />
        </>
      ) : (
        // This could be where dashboard or login page content would render
        null
      )}

  {/* Show footer only if not on /dashboard */}
  {!pathname.startsWith('/dashboard') && <Footer />}
  
      <Toaster position="top-right" />
    </>
  );
}
