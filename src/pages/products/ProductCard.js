
const ProductCard = (props) => {
    return (
        <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 mt-12">
            <img src="https://source.unsplash.com/random/300x300/?2" alt=""
                 className="object-cover object-center w-full rounded-t-md h-48 dark:bg-gray-100"/>
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">{props.name}</h2>
                    <p className="dark:text-gray-100">weight: {props.weight}</p>
                    <p className="dark:text-gray-100">price: {props.price}</p>
                    <p className="dark:text-gray-100">country: {props.country}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;