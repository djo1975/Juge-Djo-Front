import React, { useState } from 'react';
import { useGetAllRoomsQuery, useDeleteRoomMutation } from '../redux/roomAPI';

const DeleteModal = ({ onClose }) => {
  const { data: roomsData } = useGetAllRoomsQuery();

  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

  const [checked, setChecked] = useState([]);

  const handleCheckbox = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((i) => i !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const handleDelete = async () => {
    for (const id of checked) {
      try {
        await deleteRoom(id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white w-80 max-w-md p-6 rounded">
        <div className="max-h-60 lg:overflow-y-auto scrollbar md:overflow-y-auto z-100">
          <h2 className="text-center">Rooms</h2>
          <ul>
            {roomsData?.map((room) => (
              <li key={room.id}>
                <input
                  className="mr-5"
                  type="checkbox"
                  checked={checked.includes(room.id)}
                  onChange={() => handleCheckbox(room.id)}
                />
                {room.name}
              </li>
            ))}
          </ul>
          <button
            className="flex w-full justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
