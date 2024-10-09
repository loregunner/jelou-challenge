import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  isActive: boolean;
  close?: boolean;
  sizeModal?: string;
  handleClose: () => void;
}

export const Modal = ({
  children,
  title,
  isActive,
  close,
  sizeModal,
  handleClose,
}: Props) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 ${
        isActive ? "flex" : "hidden"
      }`}
      data-testid="modal_test">
      <div
        className={`p-4 rounded-lg shadow-lg bg-white ${
          sizeModal === "large" ? "w-[63rem]" : "w-[272px]"
        } md:w-[500px]`}>
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold ml-4">{title}</p>
          {!close && (
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800">
              &times;
            </button>
          )}
        </div>
        <hr className="w-11/12 mx-auto bg-gray-300" />
        {children}
      </div>
    </div>
  );
};
