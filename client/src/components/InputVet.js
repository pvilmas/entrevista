import React, { Fragment, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const InputVet = () => {
    const [vetID, setVetID] = useState(0);
    const [menu, setMenu] = useState("");

    const dropdownoptions = async () => {
        try {
            const options = await fetch("http://localhost:5000/veterinarias");
            const jsonData = await options.json();
            setMenu(jsonData);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <Dropdown 
                dropdownoptions={menu}
                onSelectedChange={setVetID}></Dropdown>
        </Fragment>
    )
};

export default InputVet;