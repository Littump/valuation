import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    buildings:[
        {
            address:'Г.Москва, Ул Пушкина дом 2 квартира 112',
            liquidity:'низкая',
            cost:'9.8',
            id:'1'
        }
        ,{
            address:'Г.Москва, Ул Пушкина дом 1 квартира 113',
            liquidity:'высокая',
            cost:'6.5',
            id:'2'
        }
        ,{
            address:'Г.Москва, Ул Пушкина дом 3 квартира 112',
            liquidity:'средняя',
            cost:'15.2',
            id:'3'
        }
        ,{
            address:'Г.Москва, Ул Пушкина дом 4 квартира 112',
            liquidity:'средняя',
            cost:'20.2',
            id:'4'
        },
    ]
}

export default createReducer(initialState, () => {
})
