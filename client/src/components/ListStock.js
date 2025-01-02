import React, { Fragment, useEffect, useState } from "react";

const ListStock = ({ vet_id }) => {
    const [stock, setStock] = useState([]);

    const getStock = async () => {
        try {
            const response = await fetch(`http://localhost:5000/stock/${vet_id}`);
            const jsonData = await response.json();
            setStock(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getStock();
    }, []);

    return(
        <Fragment>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Nombre producto</th>
                        <th>Número de serie</th>
                        <th>Cantidad disponible</th>
                        <th>Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map(item => (
                        <tr key={item.product_serial_number}>
                            <td>{item.product_name}</td>
                            <td>{item.product_serial_number}</td>
                            <td>{item.quantity}</td>
                            <td>{item.expires}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListStock;