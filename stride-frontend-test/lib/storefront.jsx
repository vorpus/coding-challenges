import React from 'react';

class Storefront extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null,
      cart: {},
      cartShown: false,
    };

    this.reqListener = this.reqListener.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
    this.shoppingCartItems = this.shoppingCartItems.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
  }

  componentWillMount() {
    let req = new XMLHttpRequest();
    req.onload = this.reqListener;
    req.open("get", "./data/inventory.json", true);
    req.send();
  }

  reqListener(e) {
    this.setState({
      items: JSON.parse(e.currentTarget.responseText).chocolates,
    });
  }

  addItemToCart(item) {
    let addingItem = Object.assign(item);

    if (this.state.cart[item.id]) {
      addingItem.qty = this.state.cart[item.id].qty + 1;
    } else {
      addingItem.qty = 1;
    }

    this.setState({
      cart: this.extend(this.state.cart, addingItem)
    });
  }

  removeItemFromCart(item) {
    let newCart = Object.assign(this.state.cart);

    delete newCart[item]

    this.setState({
      cart: newCart
    })
  }

  extend(obj, newAttr) {
    obj[newAttr.id] = newAttr;
    return obj;
  }

  emptyCart() {
    this.setState({
      cart: {},
    });
  }

  toggleCart() {
    if (this.state.cartShown) {
      this.setState({
        cartShown: false,
      });
    } else {
      this.setState({
        cartShown: true,
      });
    }
  }

  inventory() {
    const items = this.state.items ? Object.keys(this.state.items) : [];

    return items.map( (item) => {
      const chocolate = this.state.items[item];

      const addItem = () => {
        this.addItemToCart(this.state.items[item]);
      };

      return (
        <div className='chocolates-picker' key={chocolate.id}>
          <div className='chocolate-name-desc'>
            <div className='chocolate-name'>{this.formatChocoName(chocolate.type)} Chocolate</div>
            <div className='chocolate-description'>{chocolate.description}</div>
          </div>
          <div className='chocolate-price'>{this.formatCurrency(chocolate.price)}</div>
          <div className='chocolate-cart-btn' onClick={addItem}>Add to Cart</div>
        </div>
      )
    });
  }

  viewCartButton() {
    const numCartItems = () => {
      let count = 0;
      Object.keys(this.state.cart).forEach((key) => {
        count += this.state.cart[key].qty;
      });
      return count;
    };

    return (
      <div>
        <div className='view-cart-btn' onClick={this.toggleCart}>
          View Cart
          <br/>
          ({numCartItems()} items)
        </div>
      </div>
    )
  }

  formatChocoName(type) {
    let words = type.split(' ');
    return words.map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    }).join(' ');
  }

  formatCurrency(num) {
    return `$${num.toFixed(2)}`;
  }

  totalPrice() {
    const items = Object.keys(this.state.cart);
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += this.state.cart[item].qty * this.state.cart[item].price;
    });
    return totalPrice;
  }

  shoppingCartItems(items) {
    if (items.length > 0) {
      return items.map((item) => {
        let curItem = this.state.cart[item];

        const removeItem = () => {
          this.removeItemFromCart(item);
        }

        return (
          <div className='cart-item-table' key={curItem.id}>
            <div className='cart-item-name'>{this.formatChocoName(curItem.type)}</div>
            <div className='cart-item-qty'>{curItem.qty}</div>
            <div className='cart-item-price'>{this.formatCurrency(curItem.price)}</div>
            <div className='cart-item-total'>{this.formatCurrency(curItem.qty*curItem.price)}</div>
            <div className='cart-item-remove-btn' onClick={removeItem}>Remove</div>
          </div>
        )
      });
    } else {
      return (
        <div className='empty-cart'>You have no items :(</div>
      );
    }
  }

  shoppingCart() {
    const items = Object.keys(this.state.cart);
    return (
      <div className='shopping-cart-modal-bg'>
        <div className='shopping-cart'>
          <div className='cart-item-table'>
            <div className='cart-item-name'>Item</div>
            <div className='cart-item-qty'>Quantity</div>
            <div className='cart-item-price'>Unit Price</div>
            <div className='cart-item-total'>Total Price</div>
            <div className='cart-item-remove-btn'></div>
          </div>
          {this.shoppingCartItems(items)}
          <div className='cart-item-table'>
            <div className='cart-blank'></div>
            <div className='cart-blank'></div>
            <div className='cart-blank'>Total:</div>
            <div className='total-price'>{this.formatCurrency(this.totalPrice())}</div>
            <div className='cart-blank'></div>
          </div>
          <div className='cart-buttons'>
            <div className='close-cart-btn' onClick={this.emptyCart}>Clear</div>
            <div className='close-cart-btn' onClick={this.toggleCart}>Close</div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    const cartModal = this.state.cartShown ? this.shoppingCart() : '';
    // const cartModal = this.shoppingCart();

    return (
      <div>
        <header>
          Sugar Sweet Chocolate Treats (NYSE: SSCT)
        </header>
        <div className='body-content'>
          <div className='inventory'>
            {this.inventory()}
          </div>
          {this.viewCartButton()}
        </div>
        {cartModal}
      </div>
    )
  }
}

export default Storefront;
