import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';

import ErrorMessage from './ErrorMessage';
import useForm from '../lib/useForm';

import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql `
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    item: Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql `
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { 
        name: $name, 
        description: $description,
        price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. Get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // 2. Mutation to update the product
  // UpdateProduct is our setter function
  const [updateProduct, mutationResponse] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id
    },
  });

  // Create state for our form inputs
  const { clearForm, handleChange, inputs, resetForm } = useForm({
    name: data?.item?.name,
    price: data?.item?.price,
    description: data?.item?.description,
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // 3. We need the form to handle the updates
  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error || mutationResponse.error} />
      <fieldset disabled={mutationResponse.loading} aria-busy={mutationResponse.loading}>
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
        <button type="submit"> Update Product</button>
      </fieldset>
    </Form>
  )
}