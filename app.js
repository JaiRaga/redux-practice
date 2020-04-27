const redux = require("redux");
const reduxLogger = require("redux-logger");
const { createStore, combineReducers, applyMiddleware } = redux;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

const buyCake = () => ({ type: BUY_CAKE, info: "Buy a cake" });
const buyIceCream = () => ({ type: BUY_ICECREAM });

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20
// };

const initialCakeState = {
  numOfCakes: 10
};

const initialIceCreamState = {
  numOfIceCreams: 20
};

// const reducer = (prevState = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return { ...prevState, numOfCakes: prevState.numOfCakes - 1 };

//     case BUY_ICECREAM:
//       return { ...prevState, numOfIceCreams: prevState.numOfIceCreams - 1 };

//     default:
//       return prevState;
//   }
// };

const cakeReducer = (prevState = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...prevState, numOfCakes: prevState.numOfCakes - 1 };

    default:
      return prevState;
  }
};

const iceCreamreducer = (prevState = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...prevState, numOfIceCreams: prevState.numOfIceCreams - 1 };

    default:
      return prevState;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamreducer
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial State: ", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
// unsubscribe();
store.dispatch({
  type: BUY_CAKE,
  info: "Buy a cake"
});
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
