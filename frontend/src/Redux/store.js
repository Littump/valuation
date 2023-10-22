import {combineReducers, configureStore} from '@reduxjs/toolkit'
import getAnalysisReducer from './reducers/getAnalysis/getAnalysisReducer.js'
import mapReducer from "./reducers/map/mapReducer.js";
import similarBuildingsReducer from "./reducers/similarBuildings/similarBuildingsReducer.js";
import myObjectsReducer from "./reducers/myObjects/myObjectsReducer.js";
import renovationReducer from "./reducers/renovation/renovationReducer.js";
import themeReducer from "./reducers/theme/themeReducer.js";
import loginReducer from "./reducers/login/loginReducer.js";
import graphsReducer from "./reducers/graphs/graphsReducer.js";

const rootReducer = combineReducers({
    building: getAnalysisReducer,
    maps: mapReducer,
    similarBuildings: similarBuildingsReducer,
    myObjects: myObjectsReducer,
    renovation: renovationReducer,
    theme: themeReducer,
    login: loginReducer,
    graphs: graphsReducer
    }
)

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})
export default store