import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6"
import useMobile from '../hooks/useMobile'
import { BsCart4 } from "react-icons/bs"
import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
import UserMenu from './UserMenu'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import DisplayCartItem from './DisplayCartItem'

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const cartItem = useSelector((state) => state.cartItem.cart)
  const { totalPrice, totalQty } = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false)

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }
    navigate("/user")
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              width={160}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={120}
              height={50}
              alt="logo"
              className="lg:hidden"
            />
          </Link>

          {/* Search (desktop) */}
          <div className="hidden lg:block w-1/3">
            <Search />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Mobile User Icon */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={28} />
            </button>

            {/* Desktop User */}
            <div className="hidden lg:flex items-center gap-8">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center gap-1 cursor-pointer select-none hover:text-green-700 transition"
                  >
                    <span className="font-medium">Account</span>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </div>

                  {/* Dropdown */}
                  {openUserMenu && (
                    <div className="absolute right-0 top-10 animate-fadeIn">
                      <div className="bg-white rounded-lg shadow-lg p-4 min-w-52 border">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="px-4 py-2 rounded-md text-green-800 border border-green-700 hover:bg-green-700 hover:text-white transition font-medium"
                >
                  Login
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => setOpenCartSection(true)}
                className="relative flex items-center gap-3 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg text-white transition shadow-md"
              >
                <BsCart4 size={24} className="animate-bounce" />
                <div className="text-sm font-semibold">
                  {cartItem.length > 0 ? (
                    <div>
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>

                {cartItem.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    {totalQty}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search (mobile) */}
      <div className="container mx-auto px-4 pb-2 lg:hidden">
        <Search />
      </div>

      {/* Cart Drawer */}
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  )
}

export default Header
