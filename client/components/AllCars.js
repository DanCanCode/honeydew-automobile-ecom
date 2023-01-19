import React from "react";
import { connect } from "react-redux";
import { fetchCars, deleteCar } from "../store/allCarsStore";
import {
  updateCart,
  addToCart,
  saveCartToLocal,
  fetchCart,
} from "../store/cartStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { buttons } from "../styleClassNames";

class AllCars extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getCars();
  }

  handleClick(car) {
    console.log(car)
    if (!!this.props.auth) {
      this.props.addedToCart(car, this.props.cart, this.props.auth);
    } else {
      this.props.addedToCart(car, this.props.cart, -1);
    }
    window.alert(`${car.make} ${car.model} (${car.year}) added to cart!`)
  }

  render() {
    return (
      <div className="flex flex-col justify-center">
        {/* if admin, then render the link to CreateCar component otherwise don't */}
        {this.props.isAdmin ? (
          <div className="flex justify-center m-2">
            <div className="flex flex-col w-1/8 border-2 border-blue-900 p-2 rounded-3xl">
              <h2 className="text-center text-xl">ADMIN OPTIONS</h2>
              <Link className="text-center" to="/cars/modify/create">Add New Car</Link>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {/* <div> */}
          {this.props.cars.map((car) => {
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
                key={car.id}
                className="flex flex-col shadow-lg shadow-blue-500/50 justify-center bg-white rounded-xl m-2 p-2"
              >
                <Link to={`/cars/${car.id}`}>
                  <div className="flex flex-col justify-center text-center items-center">
                    <img
                      className="rounded-xl w-80 h-48"
                      src={car.imageUrl}
                    />
                    <p className="truncate w-80 font-semibold">
                      {car.make} {car.model} ({car.year})
                    </p>
                    <p>
                      {car.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-center m-2 ">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className={buttons}
                    type="submit"
                    onClick={() => this.handleClick(car)}
                  >
                    Add to cart
                  </motion.button>
                </div>
                {this.props.isAdmin ? (
                  <div className="flex flex-row justify-around">
                    <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className={buttons}
                      type="submit"
                      onClick={() => this.props.deleteCar(car.id)}
                    >
                      Remove
                    </motion.button>
                    <Link to={`/cars/edit/${car.id}`}>
                      <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className={buttons}
                        type="submit"
                        
                      >
                        Edit
                      </motion.button>
                    </Link>
                  </div>
                  
                ) : (
                  <></>
                )}
              </motion.div>
              // </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars,
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
    auth: state.auth.id,
    isAdmin: state.auth.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => dispatch(fetchCars()),
    deleteCar: (car) => dispatch(deleteCar(car, history)),
    addedToCart: (item, cart, userId) =>
      dispatch(addToCart(item, cart, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCars);