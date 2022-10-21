import { Button, Card } from 'react-bootstrap'
import { useShopingCart } from '../context/ShopingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'

type StoreItemsProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl}: StoreItemsProps) {
  const { 
    getItemQuantity,
    increaseCartQuantity, 
    decreaseCartQuantity, 
    removeFromCart
  } = useShopingCart()
  const quantity = getItemQuantity(id)
  return (
    <Card key={`${id}`} className="h-100">
      <Card.Img 
        variant="top" 
        alt={name} 
        src={imgUrl} 
        height="200px" 
        style={{ objectFit: "cover"}}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          { quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to cart</Button>
          ):(
            <div className="d-flex mx-auto align-items-center justify-content-center flex-column" style={{ gap: ".5rem"}}>
              <div className="d-flex justify-content-center align-items-baseline" style={{ gap: ".5rem"}}>
                <Button onClick={() => decreaseCartQuantity(id)} > - </Button>
                  <p><span>{quantity}</span> in the cart</p>
                <Button onClick={() => increaseCartQuantity(id)} > + </Button>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
