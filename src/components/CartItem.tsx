import { Button, Stack } from "react-bootstrap"
import { useShopingCart } from "../context/ShopingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from '../utilities/formatCurrency'


type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShopingCart()
  const item = storeItems.find(item => item.id === id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img 
        src={item.imgUrl} 
        alt={item.name} 
        style={{ width: "125px", height: "75px", objectFit: "cover"}}
      />
      <div className="me-auto d-flex justify-content-between" style={{width: "100%"}}>
        <div>
          <p> {item?.name} <span className="text-muted" style={{fontSize: ".65rem"}}>x{quantity}</span></p>
          <p className="text-muted" style={{fontSize: ".65rem"}}>{formatCurrency(item.price)}</p>
        </div>
        <div className="d-flex align-items-center">
          {formatCurrency(item.price * quantity)}
          <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </div>
      </div>
    </Stack>
  )
}
