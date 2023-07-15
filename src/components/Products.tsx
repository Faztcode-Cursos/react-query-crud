import { deleteProduct, getProducts, updateProduct } from "../api/productsAPI";
import { Product } from '../interfaces/interfaces';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const Products = () => {
  const queryClient = useQueryClient(); 

  const { isLoading, data: products, isError, error } = useQuery<Product[], Error>({ 
    queryKey: ["products"],
    queryFn: getProducts,
    //* Con "select" podemos acceder al arreglo de objeto y mutarlo como queramos, en este caso se ordena de 
    //* forma descendente por id. 
    select: products => products.sort((a,b) => b.id - a.id),
  }); 

  //* Mutacion para eliminar un producto 
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    //* onSuccess() se ejecuta al momento de terminar un DELETE
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  //* Mutacion para actualizar un producto 
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    //* onSuccess() se ejecuta al momento de terminar un PUT
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return (
    <div className="products">
      {isLoading && <h2>Loading...</h2>}

      {isError && <h2>Error: {error.message}</h2>}

      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>

          <button
            type="button"
            onClick={() => deleteProductMutation.mutate(product.id)}
          >
            Delete
          </button>
          <input
            type="checkbox"
            checked={product.inStock}
            onChange={(e) => {
              updateProductMutation.mutate({
                ...product,
                inStock: e.target.checked,
              });
            }}
          />
          <label htmlFor="">In stock</label>
        </div>
      ))}
    </div>
  );
}
