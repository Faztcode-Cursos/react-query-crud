import axios from "axios";
import { Product } from "../interfaces/interfaces";

const productApi = axios.create({
  baseURL: "http://localhost:3000/products",
});

//? Obtener todos los productos 
const getProducts = async() => {
  const res = await productApi.get("/");
  
  return res.data;
}

//? Crear un producto 
const createProduct = async (product: Product) => {
  await productApi.post("/",product);

};

//? Crear un producto 
const deleteProduct = async (id: number) => {
  await productApi.delete(`/${id}`);

};

//? Actualizar un producto 
const updateProduct = async (product: Product) => {
  await productApi.put(`/${product.id}`, product);
};

export { getProducts, createProduct, deleteProduct, updateProduct };