import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/AuthForm";
import Index from "./Index";
import AdminPanel from "@/components/AdminPanel";
import { toast } from "@/components/ui/use-toast"; // ✅ Toast hook

const AdminPage = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    if (user && isAdmin) {
      setShowAdminModal(true);
    } else if (user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive", // optional, depends on your UI library
      });
      navigate("/"); // redirect to landing page
    }
  }, [user, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <>
      <Index />
      {showAdminModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center">
          <div className="relative w-[90%] max-w-4xl bg-white rounded-xl shadow-lg p-6">
            <button
              onClick={() => {
                setShowAdminModal(false);
                navigate("/");
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <AdminPanel onClose={() => setShowAdminModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
