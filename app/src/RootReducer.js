import {combineReducers} from 'redux'
import user from './redux/reducers/user'
import stories from './redux/reducers/stories'
import utils from './redux/reducers/utils_reducer'

export default combineReducers({
    user,
    stories,
    utils
})