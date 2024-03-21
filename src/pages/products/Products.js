import Navbar from "../../components/common/Navbar";
import ProductCard from "./ProductCard";
import {useEffect, useState} from "react";
import {axiosAuthenticated} from "../../api/axios";

const Products = () => {
    const [products,setProducts] = useState();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        async function fetchProductsAndCountries() {
            try {
                const [productsResponse, countriesResponse] = await Promise.all([
                  axiosAuthenticated.get('/products'),
                  axiosAuthenticated.get('/countries')
                ]);
                setProducts(productsResponse.data);
                setCountries(countriesResponse.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
    fetchProductsAndCountries();
    }, []);

     const getCountryName = (countryId) => {
        const country = countries.find((productCountryId) => productCountryId.id === countryId);
        return country ? country.name : 'Missing';
     };


    const listProducts = products?.map((product) => (
        <li key={product.id}>
            <ProductCard
                name={product.name}
                weight={product.weight}
                price={product.price}
                country={getCountryName(getCountryName(product.country_id))}
            />
        </li>
    ));

    return (
        <div className="m-0 p-0 min-h-screen dark:bg-white dark:text-gray-500 min-w-full rounded-lg">
            <Navbar/>
            <div>
                <h2>Available Products</h2>
                <ul>
                    {listProducts}
                </ul>

            </div>
        </div>
    )
}

export default Products;