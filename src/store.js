import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers'
import { matchesListReducer } from './reducers/matchesReducers'
import { bookMatchReducer } from './reducers/bookMatchReducers'

const reducers = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    matches: matchesListReducer,
    bookMatch: bookMatchReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware =[thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store