import { FormEvent } from "react";
import { createProduct } from "../api/productsAPI";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../interfaces/interfaces";

export const ProductForm = () => {
  const queryClient = useQueryClient(); 

  const { mutate } = useMutation({
    mutationFn: createProduct,
    //* onSuccess() se ejecuta al momento de realizar un POST
    onSuccess: () => {
      console.log("Product added!");

      //* Este metodo permite comparar los datos en cache volviendo a realizar un GET para mostrar data en 
      //* tiempo real. Como argumento se pasa la key de la query GET a volver a solicitar.
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Devuelve un iterable con los datos ingresados al formulario 
    const formData = new FormData(e.target as HTMLFormElement);
    //* Convierte el iterable a objeto 
    const product = Object.fromEntries(formData);

    const newProduct = {
      ...product,
      inStock: true,
    };

    mutate(newProduct as Product);

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="text" id="price" name="price" />

      <button type="submit">Add Product</button>
    </form>
  );
};
