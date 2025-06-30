import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import AdminPanel from "@/components/AdminPanel";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import VideoSection from "@/components/VideoSection";
import BenefitsSection from "@/components/BenefitsSection";
import IncludedSection from "@/components/IncludedSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { user, isAdmin, loading } = useAuth();
  const [showAdminModal, setShowAdminModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      <Navigation onAdminToggle={() => setShowAdminModal(true)} />

      <div className="pt-16">
        <HeroSection />
        <IntroSection />
        <VideoSection />
        <BenefitsSection />
        <IncludedSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </div>

      {showAdminModal && isAdmin && user && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center">
          <div className="relative w-[90%] max-w-4xl bg-white rounded-xl shadow-lg p-6">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <AdminPanel onClose={() => setShowAdminModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;






































// import Navigation from "@/components/Navigation";
// import AdminPanel from "@/components/AdminPanel";
// import AuthForm from "@/components/AuthForm";
// import HeroSection from "@/components/HeroSection";
// import IntroSection from "@/components/IntroSection";
// import VideoSection from "@/components/VideoSection";
// import BenefitsSection from "@/components/BenefitsSection";
// import IncludedSection from "@/components/IncludedSection";
// import TestimonialsSection from "@/components/TestimonialsSection";
// import CTASection from "@/components/CTASection";
// import ContactSection from "@/components/ContactSection";
// import Footer from "@/components/Footer";
// import { useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";

// const Index = () => {
//   const [showAdmin, setShowAdmin] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const { user, isAdmin, loading } = useAuth();

//   // Show loading spinner while checking authentication
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   // Show login form if login is requested or admin panel is requested but user is not authenticated or not admin
//   if (showLogin || (showAdmin && (!user || !isAdmin))) {
//     return <AuthForm />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
//       <Navigation 
//         onAdminToggle={() => setShowAdmin(!showAdmin)} 
//         onLoginToggle={() => setShowLogin(!showLogin)}
//         showAdminButton={isAdmin}
//       />
      
//       {showAdmin && isAdmin ? (
//         <AdminPanel onClose={() => setShowAdmin(false)} />
//       ) : (
//         <div className="pt-16">
//           <HeroSection />
//           <IntroSection />
//           <VideoSection />
//           <BenefitsSection />
//           <IncludedSection />
//           <TestimonialsSection />
//           <CTASection />
//           <ContactSection />
//           <Footer />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Index;
