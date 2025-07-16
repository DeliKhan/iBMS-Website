'use client'

import useMediaQuery from "../../hooks/useMediaQuery"
import Mobile from "./mobile"
import Desktop from "./desktop"
import { useCart } from "./cartContext"


export default function Interactivity(){
    const isMobile = useMediaQuery("(max-width: 640px)");
    /*
    const [inventory, setInventory] = useState<MerchItem[]>([]);

    useEffect(() => {
        // Fetch the JSON file from the public folder
        fetch('/data/merch/merch.json')
        .then((response) => response.json())
        .then((data: MerchItem[]) => setInventory(data))
        .catch((error) => console.error('Error fetching JSON:', error));
    }, []);
    */
   const {productList} = useCart();
   /*
   const [inventory, setInventory] = useState<StripePriceWithProduct[]>([]);

    useEffect(() => {
        console.log("useEffect triggered");
        // Fetch the JSON file from the public folder
        fetch('/api/products')
        .then((response) => response.json())
        .then((data) => {setInventory(data.data); console.log('Fetched inventory:', data.data);})
        .catch((error) => console.error('Error fetching JSON:', error));
    }, []);
*/
    return (
        <>
        {isMobile ?
            ( 
                <Mobile items={productList} />
            )
            :
            (
                <Desktop items={productList} />
            )
        }
        </>
    )
}