import { useSiteInfo } from "@/hooks/useSiteInfo";

const IntroSection = () => {
  const { siteInfo, loading } = useSiteInfo();

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  const headline =
    siteInfo.intro_headline ?? "Why Quantum Healing Works";
  const subheadline =
    siteInfo.intro_subheadline ?? "Science-Based Natural Solutions";
  const description =
    siteInfo.intro_description ??
    "Our quantum healing technology has helped over 10,000 Nigerians overcome chronic health challenges. Using advanced bioenergetic principles, we address the root cause of illness at the cellular level.";

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          {headline}
        </h2>
        <h3 className="text-xl md:text-2xl text-emerald-700 mb-6 font-semibold">
          {subheadline}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default IntroSection;

















// import { useSiteInfo } from "@/hooks/useSiteInfo";

// const IntroSection = () => {
//   const { siteInfo, loading } = useSiteInfo();

//   if (loading) {
//     return (
//       <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="text-lg text-gray-600">Loading...</div>
//         </div>
//       </section>
//     );
//   }

//   const headline = siteInfo.intro_headline || "Why Quantum Healing Works";
//   const subheadline = siteInfo.intro_subheadline || "Science-Based Natural Solutions";
//   const description = siteInfo.intro_description || "Our quantum healing technology has helped over 10,000 Nigerians overcome chronic health challenges. Using advanced bioenergetic principles, we address the root cause of illness at the cellular level.";

//   return (
//     <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
//       <div className="max-w-4xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
//           {headline}
//         </h2>
//         <h3 className="text-xl md:text-2xl text-blue-700 mb-6 font-semibold">
//           {subheadline}
//         </h3>
//         <p className="text-lg text-gray-700 leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </section>
//   );
// };

// export default IntroSection;
