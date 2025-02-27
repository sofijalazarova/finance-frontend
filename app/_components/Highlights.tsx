import { FaDollarSign } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { AiOutlineSafety } from "react-icons/ai";
import monthlyBudgetImage from "@/public/monthlyBudget.png";
import expensesImage from "@/public/expenses.png";
import savingImage from "@/public/saving.png";

// const Highlights = () => {
//   return (
//     <section className="min-h-screen  container mx-auto  px-10">
//       <div className="flex flex-col items-center justify-center h-full pt-32">
//         <h1 className="text-3xl font-bold text-center text-dark-teal-green">
//           Why Budget Mate?
//         </h1>
//         <p className="text-center text-gray-600 mt-2">
//           Take control of your finances with ease and confidence.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
//           {[
//             {
//               icon: <FaDollarSign size={70} className="text-dark-teal-green" />,
//               title: "Effortless Expense Tracking",
//             },
//             {
//               icon: (
//                 <MdOutlineBarChart size={70} className="text-dark-teal-green" />
//               ),
//               title: "Clear Financial Insights",
//             },
//             {
//               icon: <GoGoal size={70} className="text-dark-teal-green" />,
//               title: "Achieve Your Goals",
//             },
//             {
//               icon: (
//                 <AiOutlineSafety size={70} className="text-dark-teal-green" />
//               ),
//               title: "Secure & Private",
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-pale-sage border-t-4 border-dark-teal-green rounded-xl p-6 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:scale-105"
//             >
//               {item.icon}
//               <h1 className="font-semibold text-xl mt-4">{item.title}</h1>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
//           {[
//             {
//               icon: <FaDollarSign size={70} className="text-dark-teal-green" />,
//               title: "Effortless Expense Tracking",
//             },
//             {
//               icon: (
//                 <MdOutlineBarChart size={70} className="text-dark-teal-green" />
//               ),
//               title: "Clear Financial Insights",
//             },
//             {
//               icon: <GoGoal size={70} className="text-dark-teal-green" />,
//               title: "Achieve Your Goals",
//             },
//             {
//               icon: (
//                 <AiOutlineSafety size={70} className="text-dark-teal-green" />
//               ),
//               title: "Secure & Private",
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-pale-sage border-t-4 border-dark-teal-green rounded-xl p-6 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:scale-105"
//             >
//               {item.icon}
//               <h1 className="font-semibold text-xl mt-4">{item.title}</h1>
//             </div>
//           ))}
//         </div>

//         <div className="border border-dark-emerald-green mt-10 mx-auto w-1/2"></div>
//       </div>
//     </section>
//   );
// };

// export default Highlights;

import Image from "next/image";

const Highlights = () => {
  return (
    <section className="min-h-screen container mx-auto px-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-center text-dark-teal-green">
          Why BudgetMate?
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Take control of your finances with ease and confidence.
        </p>

        {/* Прв ред со икони и текст */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: <FaDollarSign size={70} className="text-dark-teal-green" />,
              title: "Effortless Expense Tracking",
            },
            {
              icon: (
                <MdOutlineBarChart size={70} className="text-dark-teal-green" />
              ),
              title: "Clear Financial Insights",
            },
            {
              icon: <GoGoal size={70} className="text-dark-teal-green" />,
              title: "Achieve Your Goals",
            },
            {
              icon: (
                <AiOutlineSafety size={70} className="text-dark-teal-green" />
              ),
              title: "Secure & Private",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-pale-sage border-t-4 border-dark-teal-green rounded-xl p-6 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {item.icon}
              <h1 className="font-semibold text-xl mt-4">{item.title}</h1>
            </div>
          ))}
        </div>

        {/* Втор ред - Слики од апликацијата */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {[
            { src: monthlyBudgetImage, alt: "Budget Overview" },
            { src: expensesImage, alt: "Expense Categories" },
            { src: savingImage, alt: "Savings Goals" },
          ].map((image, index) => (
            <div
              key={index}
              className="w-60 h-60 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={200}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>

        <div className="border border-dark-emerald-green mt-10 mx-auto w-1/2"></div>
      </div>
    </section>
  );
};

export default Highlights;
