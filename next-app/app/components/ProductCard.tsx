import AddToCart from './AddToCart'

export default function ProductCard() {
  return (
    <div className="p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500">
      <h2>Product Name</h2>
      <p>Product Description</p>
      <AddToCart />
    </div>
  )
}
