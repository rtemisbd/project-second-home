import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

import { AuthContext } from "../../contexts/UserProvider";
import "./Custom.css";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user, logoutUser } = useContext(AuthContext);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const handleLogOut = () => {
    logoutUser();
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <Link to={"/profile"} onClick={closeMenu}>
          <MenuItem className={`flex items-center gap-2 rounded `}>
            <Typography as="span" variant="small" className="font-normal">
              {user?.firstName} {user?.lastName}
            </Typography>
          </MenuItem>
        </Link>
        <NavLink onClick={handleLogOut}>
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center gap-2 rounded `}
          >
            <Typography as="span" variant="small" className="font-normal">
              Log out
            </Typography>
          </MenuItem>
        </NavLink>
      </MenuList>
    </Menu>
  );
}

const navListMenuItems = [
  {
    title: "Lease Your Property",
    icon: UserCircleIcon,
    href: "/leas-property",
  },
  {
    title: "Popular Area",
    icon: CubeTransparentIcon,
  },
  {
    title: "About us",
    icon: CodeBracketSquareIcon,
    href: "/about",
  },
  {
    title: "Contact us",
    icon: CodeBracketSquareIcon,
  },
  // {
  //   title: "PSH for Business",
  //   icon: CodeBracketSquareIcon,
  // },
  {
    title: "Promo",
    icon: CodeBracketSquareIcon,
    href: "/promo",
  },
];

function NavListMenu() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogOut = () => {
    logoutUser();
  };
  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, icon, href }) => (
    <a href="#" key={title}>
      <MenuItem>
        <img src={icon} alt="" />
        <Link to={href} className=" text-black">
          <Typography variant="h6" color="blue-gray" className="mb-1">
            {title}
          </Typography>
        </Link>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center text-blue-gray-900 lg:hidden">
        <Menu>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </Button>
          <Link to={"/profile"}>
            <MenuItem className={`flex items-center rounded `}>
              <Typography as="span" variant="small" className="font-normal">
                {user?.firstName} {user?.lastName}
              </Typography>
            </MenuItem>
          </Link>
        </Menu>
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
      <div>
        {!user ? (
          <>
            <Link to={"/signin"}>
              <div className="md:block sign_btn">
                <button className=" sm:text-[14px] md:text-[16px]">
                  Sign Up/Login
                </button>
              </div>
            </Link>
          </>
        ) : (
          <NavLink onClick={handleLogOut}>
            <MenuItem className={`flex items-center gap-2 rounded `}>
              <Typography as="span" variant="small" className="font-normal">
                Log out
              </Typography>
            </MenuItem>
          </NavLink>
        )}
      </div>
    </React.Fragment>
  );
}

const navListItems = [
  {
    label: "Lease Your Property",
    icon: UserCircleIcon,
    href: "/leas-property",
  },
  {
    label: "Popular Area",
    icon: CubeTransparentIcon,
  },
  {
    label: "About us",
    icon: CodeBracketSquareIcon,
  },
  {
    label: "Contact us",
    icon: CodeBracketSquareIcon,
  },
  // {
  //   label: "PSH for Business",
  //   icon: CodeBracketSquareIcon,
  // },
  {
    label: "Promo",
    icon: CodeBracketSquareIcon,
  },
];
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography key={label} as="a" href="#">
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export default function Navmenu() {
  const [openNav, setOpenNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography as="li" className="p-1 font-normal ">
        <Link to={"/lease-property"} className=" text-black">
          Lease Your Property
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link to={"/"} className="flex items-center">
          Popular Area
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link to={"/about"} className="flex items-center">
          About us
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal">
        <Link to={"/contact"} className="flex items-center">
          Contact
        </Link>
      </Typography>
      {/* <Typography as="li" className="p-1 font-normal">
        <Link to={"/"} className="flex items-center">
          PSH for Business
        </Link>
      </Typography> */}
      <Typography as="li" className="p-1 font-normal">
        <Link to={"/promo"} className="flex items-center">
          Promo
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="bg-white navbar_sticky shadow-md ">
      <div className=" flex custom-container ">
        <Navbar className="py-2 lg:py-2 shadow-none px-0">
          <div className="flex items-center justify-between ">
            <div style={{ marginLeft: 15 }}>
              <Link to={"/"}>
                <img
                  src={"https://i.ibb.co/GpqY8tQ/PSH-web-logo-1.png"}
                  alt=""
                />
              </Link>
            </div>
            <div className="hidden lg:block">{navList}</div>

            <div className="sm:hidden md:block">
              {user ? (
                <ProfileMenu />
              ) : (
                <Link to={"/signin"}>
                  <div className="md:block">
                    <button className="sign_btn sm:text-[14px] md:text-[16px]">
                      Sign Up/Login
                    </button>
                  </div>
                </Link>
              )}
            </div>
            <IconButton
              size="sm"
              color="blue-gray"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-2 lg:hidden"
            >
              <Bars2Icon className="h-6 w-6" />
            </IconButton>
          </div>

          <Collapse open={isNavOpen} className="overflow-scroll">
            <NavList />
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
}
