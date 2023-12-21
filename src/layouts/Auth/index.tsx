import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "@/context/AuthContext";
import ButtonOnlyIcon from "@/components/button/ButtonOnlyIcon";
import UserIcon from "@/components/icons/User";
import Modal from "@/components/Modal";
import { Dialog, FocusTrap, Transition } from "@headlessui/react";
const Auth = ({ type }: { type?: string }) => {
  const { setIsOpen, isOpen, isLogin, setIsLogin }: any =
    useContext(AuthContext);

  // const handleOpenModal = () => {
  //   setIsOpen(true);
  // };

  // const handleClose = (e: any) => {
  //   setIsOpen(false);
  // };

  return (
    <>
      {type === "text" && (
        <div className="text-white text-sm">
          Bạn chưa đăng nhập?{" "}
          <span
            className="text-amber-100 cursor-pointer"
            onClick={() => {
              setIsLogin(true);
              setIsOpen(true);
            }}
          >
            Đăng nhập ngay
          </span>{" "}
        </div>
      )}
      {type !== "text" && (
        <>
          <ButtonOnlyIcon
            wrapperClassName="p-2 rounded-lg md:block hidden"
            wrapperStyle={{ border: "1px solid #7D7D7D" }}
            onClick={() => {
              setIsLogin(true);
              setIsOpen(true);
            }}
          >
            <UserIcon color="#000000" />
          </ButtonOnlyIcon>
          <div className="grid grid-cols-2 gap-2 md:hidden">
            <button
              className="col-span-1 px-2 lg:px-4 py-2 rounded-lg border border-orange-500 justify-center gap-2.5 items-center inline-flex"
              onClick={() => {
                setIsLogin(false);
                setIsOpen(true);
              }}
            >
              <div className="text-center text-orange-500 text-xs lg:text-sm font-semibold">
                Đăng ký
              </div>
            </button>
            <button
              className="col-span-1 px-2 lg:px-4 py-2 bg-orange-500 rounded-lg justify-center items-center gap-2.5 inline-flex"
              onClick={() => {
                setIsLogin(true);
                setIsOpen(true);
              }}
            >
              {" "}
              <div className="text-center text-white text-xs lg:text-sm font-semibold">
                Đăng nhập
              </div>
            </button>
          </div>
        </>
      )}
      {isOpen ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-sm  mx-auto bg-white rounded-2xl shadow-lg">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  X
                </button>

                {!isLogin && (
                  <Register
                    handleClick={() => setIsLogin(true)}

                    // ref={EnterButton}
                  />
                )}
                {isLogin && <Login handleClick={() => setIsLogin(false)} />}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Auth;
