import React from 'react';
interface DeleteChapterModalProps {
  onClose: () => void;
  onDelete: () => void;
}
function DeleteChapterModal({ onClose, onDelete }: DeleteChapterModalProps) => {
  return (
    <div >
      <div >
        <p>Are you sure you want to delete this item?</p>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteModal;
