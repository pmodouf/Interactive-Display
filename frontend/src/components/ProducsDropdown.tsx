import { useState, useEffect } from 'react';
import { fetchData } from '../service/DataFetching';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    subtitle: string;
    customerSide: string;
    prevasSide: string;
    contact?: string;
    image: string;
}
const ProductsDropdown = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchData('/product');
            setProducts(data);
        };
        getProducts();
    }, []);

    // Handler for dropdown change
    const handleDropdownChange = (e: { target: { value: any; }; }) => {
        const productId = e.target.value;
        navigate(`/product/${productId}`); // Assuming you have a route set up like this
    };

    return (
        <div>
            <select onChange={handleDropdownChange} defaultValue="">
                <option value="" disabled>Select a Product</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                        {product.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductsDropdown;
