import gql from "graphql-tag";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import ErrorMessage from "./ErrorMessage";

// (!) next to ID is to show that it is required
// Used 'items' to rename the data coming back instead of using 'Product'
const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    item: Product(where: {
      id: $id
    }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {id},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  if (!data.item) return <p>No item found for {id}</p>;

  const { item } = data;

  return (
    <div>
      <Head>
        <title>React Store | {item.name}</title>
      </Head>
      <ProductStyles className="details">
        <img src={item?.photo?.image?.publicUrlTransformed} alt={item.name} />
        <div className="details">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      </ProductStyles>
    </div>
  )
}