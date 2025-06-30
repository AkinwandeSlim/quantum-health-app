import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import SiteInfoTab from "@/components/admin/SiteInfoTab";
import ProductsTab from "@/components/admin/ProductsTab";
import VideosTab from "@/components/admin/VideosTab";
import TestimonialsTab from "@/components/admin/TestimonialsTab";

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("site_info");

  const tabs = [
    { id: "site_info", name: "Site Info" },
    { id: "products", name: "Products" },
    { id: "videos", name: "Videos" },
    { id: "testimonials", name: "Testimonials" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "site_info":
        return <SiteInfoTab />;
      case "products":
        return <ProductsTab />;
      case "videos":
        return <VideosTab />;
      case "testimonials":
        return <TestimonialsTab />;
      default:
        return <SiteInfoTab />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Content Management System</h1>
            <Button onClick={onClose} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;



































// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
// import SiteInfoTab from "@/components/admin/SiteInfoTab";
// import ProductsTab from "@/components/admin/ProductsTab";
// import VideosTab from "@/components/admin/VideosTab";
// import TestimonialsTab from "@/components/admin/TestimonialsTab";
// import ContentTabsSection from "@/components/admin/ContentTabsSection";

// interface AdminPanelProps {
//   onClose: () => void;
// }

// const AdminPanel = ({ onClose }: AdminPanelProps) => {
//   const [activeTab, setActiveTab] = useState("hero");

//   const tabs = [
//     { id: "site_info", name: "Site Info" },
//     { id: "hero", name: "Hero Section" },
//     { id: "intro", name: "Intro Section" },
//     { id: "video", name: "Video Section" },
//     { id: "products", name: "Products" },
//     { id: "videos", name: "Videos" },
//     { id: "testimonials", name: "Testimonials" },
//     { id: "cta", name: "Call to Action" },
//     { id: "contact", name: "Contact Info" }
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "site_info":
//         return <SiteInfoTab />;
//       case "products":
//         return <ProductsTab />;
//       case "videos":
//         return <VideosTab />;
//       case "testimonials":
//         return <TestimonialsTab />;
//       default:
//         return <ContentTabsSection activeTab={activeTab} />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
//       <div className="min-h-screen py-8 px-4">
//         <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b">
//             <h1 className="text-2xl font-bold text-gray-800">Content Management System</h1>
//             <Button onClick={onClose} variant="outline">
//               <X className="h-4 w-4 mr-2" />
//               Close
//             </Button>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="flex border-b overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 font-medium whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? "text-green-600 border-b-2 border-green-600"
//                     : "text-gray-600 hover:text-green-600"
//                 }`}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </div>

//           {/* Content */}
//           <div className="p-6">
//             {renderTabContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
