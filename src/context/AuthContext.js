import { createContext,  useEffect,  useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {...state, user: action.payload}
		case 'SIGNUP':
			return {...state, user: action.payload}
		case 'AUTH_IS_READY':
			return {...state, user: action.payload, authIsReady: true}
		case 'LOGOUT':
			return {...state, user: null}
		default: return state
	}

}

export const AuthContextProvider = ({children}) => {

	const [state, dispatch] = useReducer(authReducer , {
		user: null,
		authIsReady: false
	})

	useEffect(() => {
		//take user
		//when user login to page
		//check user authenticated 
		//get content everytime of user when user login again
		//logger of user
		const unsub = projectAuth.onAuthStateChanged((user) => {
			dispatch({type: 'AUTH_IS_READY', payload: user})
			unsub()
		})
	}, [])
	// console.log('AuthContext: ', state)
	return (
		<AuthContext.Provider value={{...state, dispatch}}>
			{children}
		</AuthContext.Provider>
	)
}

