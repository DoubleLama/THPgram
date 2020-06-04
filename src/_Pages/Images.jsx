import React from 'react';
import {
    useParams
  } from "react-router-dom";
export const Images = () => {
    let { id } = useParams()
    return (
        <h1>Images { id } </h1>
    )
}