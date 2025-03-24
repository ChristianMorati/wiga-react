import { MdAddPhotoAlternate } from 'react-icons/md';

function StorePhotoFileInput() {
    return (
        <div className="relative">
            <input
                type="file"
                id="fachada-file"
                className="hidden"
            />
            <label
                htmlFor="fachada-file"
                className="flex flex-row items-center absolute top-2 right-2 text-lg font-semibold bg-blue-500 text-white rounded-md cursor-pointer px-4 py-2"
            >
                <MdAddPhotoAlternate className="text-4xl" />
                <span>Fachada</span>
            </label>
        </div>
    );
}

export default StorePhotoFileInput;
