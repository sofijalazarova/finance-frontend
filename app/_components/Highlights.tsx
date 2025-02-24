import { FaDollarSign } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { AiOutlineSafety } from "react-icons/ai";

const Highlights = () => {
  return (
    <section className="container mx-auto mt-20 px-10 mb-20">
      <h1 className="text-3xl font-bold text-center text-dark-teal-green">
        Why Budget Mate?
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Take control of your finances with ease and confidence.
      </p>

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

      <div className="border border-dark-emerald-green mt-10 mx-auto w-1/2"></div>
    </section>
  );
};

export default Highlights;
