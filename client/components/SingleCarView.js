import React from 'react'
import {connect} from 'react-redux'
import { fetchCar } from '../store/singleCarStore'
import { Link } from 'react-router-dom'
import {addToCart} from '../store/cartStore'
import { buttons } from '../styleClassNames'
import { motion } from 'framer-motion'

/**
 * COMPONENT
 */
class SingleCarView extends React.Component{
    constructor(props){
        super()
        const {username} = props
    }
    componentDidMount(){
        this.props.fetchCarData(this.props.match.params.id)
    }
    handleCart(cardata){
        this.props.addedToCart(cardata, this.props.cart)
        window.alert(`${cardata.make} ${cardata.model} (${cardata.year}) added to cart!`)
    }
    render(){
        const cardata = this.props.cardata
        const randomX = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
        const randomy = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
        const randomDelay = Math.floor(Math.random()*.4)
        return (
            <div className='flex flex-col h-screen'>{ cardata ? 
                (<motion.div 
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
                    className='flex flex-col justify-center shadow-lg shadow-blue-500/50 bg-white rounded-3xl my-2 max-w-6xl mx-auto'>
                    {this.props.isAdmin? <h2>ADMIN VIEW</h2> : <></>}
                    <div className='flex justify-center'><h1 className=' text-3xl'>{cardata.year} {cardata ? cardata.make : 'Loading make'} {cardata ? cardata.model : 'Loading model'}</h1></div>
                    <div className='flex justify-center'><img className='w-1/4' src= {cardata.imageUrl}/></div>
                    <div className='flex justify-center'><h2>Year: {cardata.year}</h2></div>
                    <div className='flex justify-center'><h2>Make: {cardata.make}</h2></div>
                    <div className='flex justify-center'><h2>Model: {cardata.model}</h2></div>
                    <div className='flex justify-center'><h2>Color: {cardata.color}</h2></div>
                    <div className='flex justify-center'><h2>Price: {cardata.price}</h2></div>
                    <div className='flex justify-center px-6'><h2 className=''>Description: {cardata.description}</h2></div>
                    <div className='flex justify-center'><h2>Stock: {cardata.quantity}</h2></div>
                    <div className='flex justify-center m-2'><button className={buttons} type='button' onClick={()=>{this.handleCart(cardata)}}>Add to cart</button></div>
                    {this.props.isAdmin? (
                    <div><Link to={`/cars/edit/${cardata.id}`} >Edit</Link></div>
                    ) : (
                        <></>
                    )}
                </motion.div>)
                : 'There is no car data'
            }
            </div>
        )
    };
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    cardata: state.cardata,
    cart: state.cart,
    isAdmin: state.auth.admin,
  }
}
const mapDispatch = (dispatch) =>{
    return{
        fetchCarData: (id) => { dispatch(fetchCar(id)) },
        addedToCart: (item, cart) => dispatch(addToCart(item, cart)),
    }
}

export default connect(mapState, mapDispatch)(SingleCarView)