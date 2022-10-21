import { useState } from 'react'
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShopingCart } from '../context/ShopingCartContext'
export function NavBar() {
  const { openCart, cartQuantity } = useShopingCart()

  return (
    <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link to={'/'} as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to={'/store'} as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to={'/about'} as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        { cartQuantity > 0 && (
          <Button 
          className="border btn btn-light " 
          style={{width: '3rem', height: '3rem', position: 'relative'}}
          onClick={() => openCart()}
        >
          🛒
          <div 
            style={{
              color: 'white',
              width: '1.5rem',
              height: '1.5rem',
              position: 'absolute',
              bottom: '0',
              right: '0',
              transform: 'translate(50%,25%)'
            }}
            className='rounded-circle bg-danger d-flex justify-content-center aling-items-center'
          >
            {cartQuantity}
          </div>
        </Button>
        )}
      </Container>
    </NavbarBs>
  )
}
