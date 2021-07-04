import React from "react";
import BurgerIcon from "../svg/BurgerIcon";
import classes from "./burger.module.scss"

const Burger = () => {
    return <>
        <BurgerIcon classModule = {classes.burger}/>
    </>
}

export default Burger;