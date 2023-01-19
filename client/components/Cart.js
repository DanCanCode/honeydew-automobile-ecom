import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { modifyCartQuantity, removeAllFromCart, removeFromCart } from '../store/cartStore'
import { addToOrders } from '../store/orderStore'
import { buttons } from '../styleClassNames'
import { motion } from 'framer-motion'
/**
 * COMPONENT
 */
class Cart extends React.Component{
    constructor(props){
        super()
        const {username} = props
    }
    componentDidMount(){
        const {username} = this.props
        this.handleCheckout = this.handleCheckout.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
        this.handleQuantity = this.handleQuantity.bind(this)
        this.handleCheckout = this.handleCheckout.bind(this)
    }
    handleCheckout(cartdata, quantity, price, userId){
        console.log("CARTDATA!", cartdata)
        this.props.addToOrders(cartdata, quantity, price, userId)
        this.props.emptyCart(cartdata,userId)
        //checkout with payment processor
    }
    handleRemoveItem(item){
        if(!!this.props.auth){
            this.props.removeItemFromCart(item, this.props.cart, this.props.auth)
        }else{
            this.props.removeItemFromCart(item, this.props.cart, -1)
        }
    }
    handleQuantity(event, item){
        const newQuantity = parseInt(event.target.value)
        if(newQuantity>0){
            this.props.modifyCartItemQuantity(item,newQuantity,this.props.cart)
        }else{
            this.props.removeItemFromCart(item.id, this.props.cart)
        }
    }
    render(){
        const {username} = this.props
        const cartdata = this.props.cart
        let cartTotal = 0
        let numberOfItems = 0
        return (
            <div className='flex flex-col justify-center h-screen'>
                <div className='flex justify-center'>
                    <h1 className='text-white capitalize text-3xl'>{username ? username : "guest"}'s cart</h1>
                </div>
                <div className='flex flex-row justify-center'>
                {
                    cartdata  ?
                    cartdata.map
                    ((cartItem) =>
                        {
                            if(!!cartItem.item){
                                cartTotal += cartItem.item.price * cartItem.quantity
                                numberOfItems = numberOfItems + cartItem.quantity
                                const randomX = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
                                const randomy = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
                                const randomDelay = Math.floor(Math.random()*.4)
                                return (
                                <motion.div
                                initial={{
                                    opacity: 0,
                                    x:`${randomX}`,
                                    y:`${randomy}`,
                                    scale: 0
                                  }}
                                  whileInView={{
                                    opacity: 1,
                                    x:0,
                                    y:0,
                                    scale: 1
                                  }}
                                  transition={{
                                    delay: randomDelay
                                  }}
                                 className='flex flex-col justify-center shadow-lg shadow-blue-500/50 bg-white rounded-3xl m-2' key={cartItem.item.id}>
                                    <div className='flex justify-center'><h2>{cartItem.item.name}</h2></div>
                                    <div className='flex justify-center'><img className='w-96 h-52 justify-center m-2' src={cartItem.item.imageUrl}/></div>
                                    <div className='flex justify-center'><h2 className='text-center m-2'>Price: {cartItem.item.price}</h2></div>
                                    <div className='flex justify-center flex-row'><h2 className='text-center m-2'>Quantity: {cartItem.quantity} </h2><input type='number' value={cartItem.quantity} name={cartItem.item.id} onChange={(e)=>{this.handleQuantity(e,cartItem.item)}}/></div>
                                    <div className='flex justify-center m-2'><button className={buttons} type='button' onClick={()=>{this.handleRemoveItem(cartItem.item.id)}}>Remove Item</button></div>
                                </motion.div>
                                )
                            }
                        }
                    )
                    : "Theres nothing in the cart"
                }
                </div>
                <div className='flex flex-col justify-center m-2 text-white'>
                    <div className='flex justify-center'><h2>Number of items in cart: {numberOfItems}</h2></div>
                    <div className='flex justify-center'><h2>Subtotal: ${cartTotal}</h2></div>
                    <div className='flex justify-center'><button className={ buttons } type='button' onClick={()=> (this.handleCheckout(cartdata, numberOfItems, cartTotal, this.props.auth))}> Checkout</button> </div>
                </div>
            </div>
        )
    };
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.name,
    cart: state.cart,
    auth: state.auth.id,
  }
}
const mapDispatch = (dispatch, {history}) =>{
    return{
        removeItemFromCart: (item,cart,userId) => dispatch(removeFromCart(item, cart, userId)),
        modifyCartItemQuantity: (item,value,cart) => dispatch(modifyCartQuantity(item,value,cart)),
        addToOrders:(item, quantity, price, userId) => dispatch(addToOrders(item, quantity, price, userId, history)),
        emptyCart: (cart,userId)=> dispatch(removeAllFromCart(cart,userId))
    }
}

export default connect(mapState, mapDispatch)(Cart)
