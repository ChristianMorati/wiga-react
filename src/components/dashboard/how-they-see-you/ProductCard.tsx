import { FiTrash } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import './ProductCard.css';
import { IoStorefrontSharp } from "react-icons/io5";

type ProdustCardProps = { item: any };

const ProductCard = ({ item }: ProdustCardProps) => {
  const plains = {
    platinum: "silver",
    gold: "gold",
  };

  const plain = plains.gold;

  return (
    <div className={`card example-2 ${plain} bg-gray-100`}>
      <div className={`bg-white inner`}>
        <div className="flex flex-row justify-between">
          <button className="bg-blue-500 text-white p-1 shadow-md hover:bg-blue-600 text-xs">
            <Tooltip id={`see-store-icon-${item.id}`} />
            <a data-tooltip-id={`see-store-icon-${item.id}`} data-tooltip-content="Ir á loja">
              <IoStorefrontSharp />
            </a>
          </button>
        </div>

        <img src={item.image} alt={item.name} className="w-full object-contain h-[150px] max-w-[100%]:" />

        <div className="p-1 border-t border-gray-200">
          <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap line-clamp-2">
            {item.name}
          </p>
          <p className="text-sm">{item.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;