import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "gatsby";

const Navigation = () => {
  const navItems = [
    { url: "/articles", text: "Blog" },
    { url: "/about", text: "About" },
    { url: "/about/#contact", text: "Contact" },
  ];

  return (
    <section className="pt-8">
      <nav>
        <div className="container mx-auto">
          <div className="text-2xl mb-2 font-bold text-gray-800 dark:text-slate-300">
            <Link to="/">Andrew Villazon</Link>
          </div>
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  to={item.url}
                  key={item.text}
                  className="text-lg py-2 text-gray-700 font-medium hover:border-b-blue-600 hover:text-blue-600 border-transparent border-y-2 dark:text-slate-400 dark:hover:border-b-blue-500 dark:hover:text-blue-500"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            <div>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navigation;
