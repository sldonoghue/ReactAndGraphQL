import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router  from "next/router";

import { ALL_PRODUCTS_QUERY } from "./Products";
import ErrorMessage from "./ErrorMessage";

import useForm from "../lib/useForm";

import Form from "./styles/Form";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And what types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        status: "AVAILABLE"
        price: $price
        photo: {
          create: {
            image: $image
            altText: $name
          }
        }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { clearForm, handleChange, inputs, resetForm } = useForm({
    name: "Test",
    price: 123,
    description: "This is a test",
    image: '',
  });

  // destructuring the payload recieved from the mutation. createProduct is the name of the function which is fired when the mutation is called
  const [createProduct, { data, error, loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    // refetch data so user is shown latest data not cached version (which could be out of date)
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    // Redirect to product page using Next JS Router
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });

  }

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
      <label htmlFor="image">
          Image
          <input 
            required
            type="file" 
            id="image" 
            name="image" 
            onChange={handleChange} 
          />
        </label>
        <label htmlFor="name">
          Name
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Name" 
            value={inputs.name}
            onChange={handleChange} 
          />
        </label>
        <label htmlFor="price">
          Price
          <input 
            type="number" 
            id="price" 
            name="price" 
            placeholder="Price" 
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea 
            id="description"
            name="description"
            placeholder="Enter A Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit"> Add Product</button>
      </fieldset>
    </Form>
  )

}