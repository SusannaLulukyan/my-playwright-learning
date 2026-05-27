type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

const product1: Product = {
  name: "t-shirt",
  price: 29,
  inStock: true,
};

const product2: Product = {
  name: "jeans",
  price: 59,
  inStock: false,
};

console.log(product1.name);
console.log(product2.price);
function formatPrice(price: number): string {
  return `$${price}`;
}

console.log(formatPrice(29));
console.log(formatPrice(59));