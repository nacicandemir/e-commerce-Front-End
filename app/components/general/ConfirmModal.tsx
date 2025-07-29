"use client";
import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  message = "Bu işlemi gerçekleştirmek istediğinize emin misiniz?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <p className="text-gray-800 text-base mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Vazgeç
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer"
          >
            Evet Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
