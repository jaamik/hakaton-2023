import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  menu: {
    results: [
    ]
  },
  categories: [
  ],
  token: null,
  toggleEditModal: {},
  basket: [],
  isAddedToBasket: false,
  order: null,
  adminNumber: '996755551707'
}

export const menuSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setAllMenu: (state, action) => {
      state.menu = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setToggleEditModal: (state, action) => {
      state.toggleEditModal = action.payload
    },
    setToBasket: (state, action) => {
      state.basket = action.payload
    },
    isAddToBasket: (state, action) => {
      state.isAddedToBasket = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload
    }
    
  },
})

export const { setCategories, setAllMenu, setToken, 
  setToggleEditModal, setToBasket, isAddToBasket, setOrder 
} = menuSlice.actions;
// ACTIONS
const api = process.env.NEXT_PUBLIC_API_URL;

export const isTokenRefresh = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const basket = JSON.parse(localStorage.getItem('basket'))

  dispatch(setToBasket(basket))

  if (token?.refresh || token?.access) {
    try {
      const res = await axios.post(api + '/token/refresh/', {refresh: token.refresh});
      dispatch(setToken(res.data))
      console.log(res.data, 'REFRESH-TOKEN');
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('basket');
    }
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('basket');
  }
}

export const authAdmin = (data) => async (dispatch) => {
  try {
    const res = await axios.post(api + '/token/', data);
    localStorage.setItem('token', JSON.stringify(res.data))
    console.log(res.data, 'RES_AUTH');
    dispatch(setToken(res.data))
  } catch (error) {
  }
}
//MENU
export const getAllMenu = () => async (dispatch) => {
  try {
    const res = await axios.get(api + '/meals/');
    dispatch(setAllMenu(res.data))
  } catch (error) {
  }
}
export const getMenuByCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(api + '/meals/?category=' + id);
    console.log(res, 'res-CATEGORY-one ');
    dispatch(setAllMenu(res.data))
  } catch (error) {
  }
}
export const removeMeal = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const res = await axios.delete(api + `/meals/${id}/`, {
      headers: {
        Authorization: 'JWT ' + token.access
      },
    });
    dispatch(getAllMenu())
  } catch (error) {
  }
}
export const createMeal = (item, defaultCategory) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const formData = new FormData();

  formData.append('image', item.image);
  formData.append('title', item.title);
  formData.append('price', item.price);
  formData.append('discount', item.discount);
  formData.append('description', item.description);
  formData.append('category', item.category || +defaultCategory.id);
  
  try {
    const res = await axios.post(api + '/meals/', formData, {
      headers: {
        Authorization: 'JWT ' + token.access
      },
    });
    dispatch(getAllMenu())
  } catch (error) {
  }
}
export const editMeal = (item) => async (dispatch) => {
  console.log(item, 'item');
  const token = JSON.parse(localStorage.getItem('token'))
  const formData = new FormData();

  if (typeof item.image !== 'string') {
    formData.append('image', item.image);
  }
  formData.append('title', item.title);
  formData.append('price', item.price);
  formData.append('discount', item.discount);
  formData.append('description', item.description);
  formData.append('category', item.category.id);
  
  try {
    const res = await axios.patch(api + `/meals/${item.id}/`, formData, {
      headers: {
        Authorization: 'JWT ' + token.access
      },
    });
    dispatch(getAllMenu())
  } catch (error) {
  }
}
//CATEGORY
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(api + '/categories/');
    dispatch(setCategories(res.data))
  } catch (error) {
  }
}
export const createCategory = (item) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const res = await axios.post(api + '/categories/', item, {
      headers: {
        Authorization: 'JWT ' + token.access
      },
    });
    dispatch(getCategories())
  } catch (error) {
  }
}
export const removeCategory = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const res = await axios.delete(api + '/categories/' + id, {
      headers: {
        Authorization: 'JWT ' + token.access
      },
    });
    dispatch(getCategories())
  } catch (error) {
  }
}

//MODAL
export const toggleEditModal = (value) => async (dispatch) => {
  try {
    dispatch(setToggleEditModal(value))
  } catch (error) {
  }
}

//BASKET
export const addToBasket = (item) => async (dispatch) => {
  try {
    dispatch(setToBasket(item))
    dispatch(isAddToBasket(true))

  } catch (error) {
  }
}

export const isBasketAdded = (is) => async (dispatch) => {
  dispatch(isAddToBasket(is))
}

//ORDER
export const createOrder = (item) => async (dispatch) => {
  const basket = JSON.parse(localStorage.getItem('basket'))

  const basket_ids = basket.map((card) => {
    return {
      meal: card.id,
      quantity: card.count
    }
  })
  const data = {
    ...item,
    ordering_meals: basket_ids
  }
  try {
    const res = await axios.post(api + '/orders/', data);
    const newData = res.data.meals.map((card) => {
      return {
        title: card.meal.title,
        count: card.quantity
      }
    })
    const text = newData.map((item) => {
      return item.count + ' ' + item.title
    })
    console.log(res, 'res-CHECK');
    const staticText = `Здравствуйте! Мой номер телефона ${res.data.client_phone} .Я заказал `
    const decode = `https://wa.me/${initialState.adminNumber}?text=` + staticText + text;
    console.log(encodeURI(decode), 'decode');
    await dispatch(setOrder(decode))
  } catch (error) {
  }
}

export default menuSlice.reducer