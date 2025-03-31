import { MdAddPhotoAlternate } from 'react-icons/md';

function StorePhotoFileInput() {
    return (
        <>
            <label
                htmlFor="fachada-file"
                className="flex flex-row items-center text-sm font-semibold bg-blue-500 text-white cursor-pointer px-4 py-2"
            >
                <MdAddPhotoAlternate className="text-xl" />
                <span>Fachada</span>
            </label>
            <input
                type="file"
                id="fachada-file"
                className="hidden"
            />
        </>
    );
}

export default StorePhotoFileInput;
