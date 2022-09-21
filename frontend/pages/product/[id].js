// file name specific to Next JS - use this template for any pages that match this layout (i.e. product/[id]) in HTTP request
import SingleProduct from "../../components/SingleProduct"

export default function SingleProductPage({ query }) {
  return (
    <SingleProduct id = {query.id}>
      <div>{query}</div>
    </SingleProduct>
  )
}
  
