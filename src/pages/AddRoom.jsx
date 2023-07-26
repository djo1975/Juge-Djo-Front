import { useState } from 'react';
import { useCreateNewRoomMutation } from '../redux/roomAPI';
import { Toast, useToast } from '../components/Toast';
import backimg from '../assets/background.jpg';
import BackButton from '../components/BackButton';

const AddRoom = () => {
  const [createRoom, { isLoading: isCreating }] = useCreateNewRoomMutation();

  const [displayBool, message, type, showToast] = useToast();

  const initialRoomData = {
    Name: '',
    Description: '',
    Url: '',
    Price: '',
  };

  const [roomData, setRoomData] = useState(initialRoomData);

  const handleInputChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoom = {
      room: {
        name: roomData.Name,
        description: roomData.Description,
        icon: roomData.Url,
        cost_per_day: roomData.Price,
      },
    };

    createRoom(newRoom);
    showToast('Room added successfully', 'success');

    setRoomData(initialRoomData);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen gap-8 text-white">
      {displayBool && <Toast message={message} type={type} />}

      <BackButton />

      <div className="absolute inset-0 overflow-hidden">
        <img src={backimg} alt="Background" className="object-fill w-full h-full " />
        <div className="absolute inset-0 z-0 opacity-90 bg-[#96bf01]" />
      </div>

      {/* For a room image preview */}
      <div className="z-10 items-center justify-center hidden text-center rounded-full md:absolute lg:absolute left-40 top-52 w-80 h-80 md:flex lg:flex outline-4 outline">
        {roomData.Url && (
          <img src={roomData.Url} alt="Background" className="object-fill rounded-full w-80 h-80 " />
        )}

        {!roomData.Url && <p className="text-lg font-bold">Image Preview</p>}
      </div>

      <h1 className="text-white z-10 font-serif  lg:ml-[350px]  md:ml-[350px] font-extrabold text-3xl">
        Add new room
      </h1>

      <form
        className="relative z-10 bg-white p-4 md:w-2/6  lg:w-2/6 lg:ml-[350px] w-3/5  md:ml-[350px]  flex flex-col items-end"
        onSubmit={handleSubmit}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            value={roomData.Name}
            name="Name"
            id="Name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChange}
          />
          <label
            htmlFor="Name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Room model's name
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            value={roomData.Description}
            name="Description"
            id="Description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChange}
          />
          <label
            htmlFor="Description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            value={roomData.Price}
            name="Price"
            id="Price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChange}
          />
          <label
            htmlFor="Price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Price
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="url"
            value={roomData.Url}
            name="Url"
            id="Url"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChange}
          />
          <label
            htmlFor="Url"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Model image's URL
          </label>
        </div>
        <button type="submit" className="text-white self-center  w-3/6 font-semibold bg-[#96bf01] py-2 rounded-full">
          Add Room
        </button>
      </form>
    </div>
  );
}

export default AddRoom;
