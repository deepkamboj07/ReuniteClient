import {configureStore} from '@reduxjs/toolkit'
import friendReducer from './friendsStore';
import chatReducer from './chatStore';
import userReducer from './userStore';
import thunk from 'redux-thunk';
import roomReducer from './createRoomStore';

const store=configureStore({
    reducer:{friend:friendReducer, chat:chatReducer, room:roomReducer, user:userReducer},
    middleware: [thunk],
});
export default store;