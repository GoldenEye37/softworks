import Navbar from "../../components/common/Navbar";


const products = [
    {
        "id": 1,
        "name": "3KG Tank",
        "weight": "3.00",
        "price": "200.00",
        "country_id": 1,
        "created_at": "2023-11-18T17:35:51.000000Z",
        "updated_at": "2023-11-18T17:35:51.000000Z"
    },
    {
        "id": 2,
        "name": "5KG Tank",
        "weight": "3.00",
        "price": "300.00",
        "country_id": 1,
        "created_at": "2023-11-18T17:35:51.000000Z",
        "updated_at": "2023-11-18T17:35:51.000000Z"
    },
    {
        "id": 3,
        "name": "7KG Tank",
        "weight": "7.00",
        "price": "450.00",
        "country_id": 1,
        "created_at": "2023-11-18T17:36:43.000000Z",
        "updated_at": "2023-11-18T17:36:43.000000Z"
    }
]

const countries = [
    {
        "id": 1,
        "name": "South Africa",
        "created_at": "2023-11-18T17:33:25.000000Z",
        "updated_at": "2023-11-18T17:33:25.000000Z"
    },
    {
        "id": 2,
        "name": "Zimbabwe",
        "created_at": "2023-11-18T17:33:25.000000Z",
        "updated_at": "2023-11-18T17:33:25.000000Z"
    }
]

const Countries = () => {
    return (
        <div className="m-0 p-0 min-h-screen dark:bg-white dark:text-gray-500 min-w-full rounded-lg">
            <Navbar/>
            Countries Page
        </div>
    )
}

export default Countries;