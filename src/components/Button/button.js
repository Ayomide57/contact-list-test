import React from "react";
import { Button } from "react-bootstrap";


const CustomButton = (props) => {
    return <Button size="lg" value={props.name} className="" />
}


export default CustomButton;