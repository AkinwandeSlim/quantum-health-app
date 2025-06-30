import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Heart, Settings, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  onAdminToggle: () => void;
}

const Navigation = ({ onAdminToggle }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname === "/admin";

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLogin = () => {
    navigate("/admin");
    setIsOpen(false);
  };

  const handleAdminPanel = () => {
    onAdminToggle(); // modal trigger
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-900/95 backdrop-blur-md border-b border-green-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-green-400 mr-2" />
            <span className="text-xl font-bold text-white">Quantum Health</span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-green-100 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}

            {!user && isAdminRoute && (
              <Button
                onClick={handleLogin}
                variant="outline"
                size="sm"
                className="border-green-400/40 text-green-400 hover:bg-green-800/30"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            {user && isAdmin && (
              <>
                <Button
                  onClick={handleAdminPanel}
                  variant="outline"
                  size="sm"
                  className="border-green-400/40 text-green-400 hover:bg-green-800/30"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-400/40 text-red-400 hover:bg-red-800/30"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-100 hover:text-green-400 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-green-800/95 backdrop-blur-md rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-green-100 hover:text-green-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}

              {!user && isAdminRoute && (
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  size="sm"
                  className="w-full border-green-400/40 text-green-400 hover:bg-green-800/30 mt-2"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}

              {user && isAdmin && (
                <>
                  <Button
                    onClick={handleAdminPanel}
                    variant="outline"
                    size="sm"
                    className="w-full border-green-400/40 text-green-400 hover:bg-green-800/30 mt-2"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="w-full border-red-400/40 text-red-400 hover:bg-red-800/30 mt-2"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
































// import { useState } from "react";
// import { Menu, X, Heart, Settings, LogOut, LogIn } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/AuthContext";

// interface NavigationProps {
//   onAdminToggle: () => void;
//   onLoginToggle?: () => void;
//   showAdminButton?: boolean;
// }

// const Navigation = ({ onAdminToggle, onLoginToggle, showAdminButton = false }: NavigationProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { signOut, user } = useAuth();

//   const navItems = [
//     { name: "Home", href: "#home" },
//     { name: "Products", href: "#products" },
//     { name: "Testimonials", href: "#testimonials" },
//     { name: "Contact", href: "#contact" },
//   ];

//   const handleSignOut = async () => {
//     await signOut();
//     setIsOpen(false);
//   };

//   const handleLoginClick = () => {
//     if (onLoginToggle) {
//       onLoginToggle();
//     }
//     setIsOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-green-900/95 backdrop-blur-md border-b border-green-400/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Heart className="h-8 w-8 text-green-400 mr-2" />
//             <span className="text-xl font-bold text-white">Quantum Health</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-green-100 hover:text-green-400 transition-colors duration-200 font-medium"
//               >
//                 {item.name}
//               </a>
//             ))}
            
//             {!user && (
//               <Button
//                 onClick={handleLoginClick}
//                 variant="outline"
//                 size="sm"
//                 className="border-green-400/40 text-green-400 hover:bg-green-800/30"
//               >
//                 <LogIn className="h-4 w-4 mr-2" />
//                 Login
//               </Button>
//             )}
            
//             {showAdminButton && (
//               <>
//                 <Button
//                   onClick={onAdminToggle}
//                   variant="outline"
//                   size="sm"
//                   className="border-green-400/40 text-green-400 hover:bg-green-800/30"
//                 >
//                   <Settings className="h-4 w-4 mr-2" />
//                   Admin
//                 </Button>
//                 <Button
//                   onClick={handleSignOut}
//                   variant="outline"
//                   size="sm"
//                   className="border-red-400/40 text-red-400 hover:bg-red-800/30"
//                 >
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Logout
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-green-100 hover:text-green-400 transition-colors duration-200"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-green-800/95 backdrop-blur-md rounded-lg mt-2">
//               {navItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="block px-3 py-2 text-green-100 hover:text-green-400 transition-colors duration-200 font-medium"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.name}
//                 </a>
//               ))}
              
//               {!user && (
//                 <Button
//                   onClick={handleLoginClick}
//                   variant="outline"
//                   size="sm"
//                   className="w-full border-green-400/40 text-green-400 hover:bg-green-800/30 mt-2"
//                 >
//                   <LogIn className="h-4 w-4 mr-2" />
//                   Login
//                 </Button>
//               )}
              
//               {showAdminButton && (
//                 <>
//                   <Button
//                     onClick={() => {
//                       onAdminToggle();
//                       setIsOpen(false);
//                     }}
//                     variant="outline"
//                     size="sm"
//                     className="w-full border-green-400/40 text-green-400 hover:bg-green-800/30 mt-2"
//                   >
//                     <Settings className="h-4 w-4 mr-2" />
//                     Admin Panel
//                   </Button>
//                   <Button
//                     onClick={handleSignOut}
//                     variant="outline"
//                     size="sm"
//                     className="w-full border-red-400/40 text-red-400 hover:bg-red-800/30 mt-2"
//                   >
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Logout
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
