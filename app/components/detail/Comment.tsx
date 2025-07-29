"use client";
import { useState } from "react";
import { Rating } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import ConfirmModal from "../general/ConfirmModal";
import { AiOutlineDelete } from "react-icons/ai";

const Comment = ({
  prd,
  currentUser,
}: {
  prd: any;
  currentUser: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(`/api/review/${selectedId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        location.reload();
      } else {
        const data = await res.json();
        alert(data.error || "Silme başarısız");
      }
    } catch (err) {
      console.error("Silme hatası:", err);
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm transition-shadow duration-200 relative">
      {(currentUser?.id === prd.user?.id || currentUser?.role === "ADMIN") && (
        <button
          onClick={() => openModal(prd.id)}
          className="absolute top-2 right-3 text-lg cursor-pointer"
        >
          <AiOutlineDelete/>
        </button>
      )}

      <div className="flex items-center gap-3 mb-3">
        <RxAvatar size={40} className="text-gray-500" />
        <div className="flex flex-col">
          <div className="font-semibold text-gray-800 text-base">
            {prd?.user?.name || "Anonim Kullanıcı"}
          </div>
          <Rating
            name="read-only"
            value={parseFloat(prd?.rating) || 0}
            readOnly
            size="small"
          />
        </div>
      </div>

      <div className="text-gray-700 leading-relaxed text-base">
        {prd.comment}
      </div>

      {/* Modal */}
      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
        message="Bu yorumu silmek istediğinizden emin misiniz?"
      />
    </div>
  );
};

export default Comment;
