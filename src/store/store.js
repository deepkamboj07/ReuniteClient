import {configureStore} from '@reduxjs/toolkit'
import friendReducer from './friendsStore';
import chatReducer from './chatStore';
import userReducer from './userStore';
import thunk from 'redux-thunk';
import roomReducer from './createRoomStore';
import soundReducer from './soundStore';

const store=configureStore({
    reducer:{friend:friendReducer, chat:chatReducer, room:roomReducer, user:userReducer, sound:soundReducer},
    middleware: [thunk],
});
export default store;