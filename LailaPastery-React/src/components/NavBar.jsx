import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { FaGift } from "react-icons/fa";
import Logo from "../assets/Logo.png";
import chef from "../assets/far-chef.png";
import mixer from "../assets/mixer.png";
import promotions from "../assets/promotions.png";
import recipe from "../assets/recipe.png";
import PopupUserBanner from "./PopupUserBanner";
import CartButtonHandler from "./CartButtonHandler";
import { FaSearch } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { FaShoppingBasket } from "react-icons/fa";

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  props.RedirectVersDash();
  return (
    <div className="sticky top-0 z-50" >
      <div className="flex text-white items-center justify-center bg-primary">
        <FaGift />
        <h6 className="py-1 mx-1 text-center text-sm md:text-base">
          Livraison offerte à partir de 500 dhs d'achats
        </h6>
      </div>

      <div className="flex text-third items-center justify-center bg-secondary">
        <h6 className="py-1 mx-1 text-center text-xs md:text-base">
          Bienvenue dans la cuisine de Prestige Cake ! Ici, vous Profiterez des
          Promos à partir de -25%
        </h6>
      </div>

      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl md:flex md:justify-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 h-16">
            <img width="40" height="40" src={Logo} alt="" />
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/"
                    className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                  >
                    <img src={chef} alt="chef" width="20px" height="20px" />
                    <span className="mx-2 text-base text-third">Acceuil</span>
                  </a>

                  <a
                    href="/Categories"
                    className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                  >
                    <img src={mixer} alt="mixer" width="20px" height="20px" />
                    <span className="mx-2 text-base text-third">
                      Nos&nbsp;Produits
                    </span>
                  </a>

                  <a
                    href="/SearchProducts?promo"
                    className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                  >
                    <img
                      src={promotions}
                      alt="promotions"
                      width="20px"
                      height="20px"
                    />
                    <span className="mx-2 text-base text-third">
                      Promotions
                    </span>
                  </a>

                  {/* <a
                    href="#"
                    className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                  >
                    <img src={recipe} alt="chef" width="20px" height="20px" />
                    <span className="mx-2 text-base text-third">Blogs</span>
                  </a> */}
                </div>
              </div>

              <div className="bg-white flex items-center rounded-lg border w-full">
                <input
                  className="w-full px-2 text-third leading-tight font-medium focus:outline-none"
                  id="search"
                  type="text"
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search"
                />
                <a
                  href={"/SearchProducts?query=" + searchQuery}
                  className="text-third hover:text-white rounded-tr-lg rounded-br-lg p-1 hover:bg-third focus:outline-none flex items-center justify-center border border-white hover:border-third"
                >
                  <FaSearch className="h-5 w-5" />
                </a>
              </div>

              <PopupUserBanner
                user={props.user}
                addUser={props.addUser}
                logoutUser={props.logoutUser}
                loginUser={props.loginUser}
              />

              {/* <a
                href="#"
                className="hover:bg-secondary px-1 py-1 rounded-md text-sm font-medium flex items-center justify-center"
              >
                <GrFavorite className="text-third h-6 w-6" />
              </a> */}

              <CartButtonHandler
                user={props.user}
                addUser={props.addUser}
                loginUser={props.loginUser}
                commande={props.commande}
              />
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-third inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-third hover:bg-secondary"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="/"
                  className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                >
                  <img src={chef} alt="chef" width="20px" height="20px" />
                  <span className="mx-2 text-third">Acceuil</span>
                </a>

                <a
                  href="/SearchProducts?query="
                  className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                >
                  <img src={mixer} alt="mixer" width="20px" height="20px" />
                  <span className="mx-2 text-third">Nos&nbsp;Produits</span>
                </a>

                <a
                  href="/SearchProducts?promo"
                  className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                >
                  <img
                    src={promotions}
                    alt="promotions"
                    width="20px"
                    height="20px"
                  />
                  <span className="mx-2 text-third">Promotions</span>
                </a>

                {/* <a
                  href="#"
                  className="hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center border-b-4 border-white hover:border-third"
                >
                  <img src={recipe} alt="chef" width="20px" height="20px" />
                  <span className="mx-2 text-third">Blogs</span>
                </a> */}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default NavBar;
