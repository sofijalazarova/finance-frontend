import { Button } from "@/components/ui/button";
import React, { cloneElement, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { createContext } from "react";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";


interface WindowProps {
  children: React.ReactNode;
  name: string;
}

interface ModalProps {
  children: React.ReactNode;
}

interface OpenProps {
  children: React.ReactNode;
  opens: string;
}

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType>({
  openName: "",
  close: () => {},
  open: () => {},
});

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children as React.ReactElement, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs  bg-black bg-opacity-50 z-50">
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-lg p-8 transition-all duration-500 w-1/4"
      >
        <div className="flex justify-end">
          <Button
            onClick={close}
            className="bg-ice-white text-black border-none rounded-sm translate-x-2 transition-all duration-200 hover:bg-gray-100"
          >
            <HiXMark />
          </Button>
        </div>
        <div>
          {cloneElement(children as React.ReactElement, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;