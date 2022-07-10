import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //get initial user for testing
  const getUsers = async()=>{
    setLoading()
    const response= await fetch(`${GITHUB_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }


  const searchUsers = async(searchString)=>{
    const params = new URLSearchParams({
      q: searchString
    })
    setLoading()
    const response= await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const {items} = await response.json();
    //console.log(data.items)
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  const getUserRepos = async(login)=>{
    setLoading()
    const params = new URLSearchParams({
      sort: 'created',
      per_page: '10'
    })
    const response= await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json();
    //console.log(data.items)
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }



  const getUser = async(login)=>{
    //console.log(login)
    setLoading()
    const response= await fetch(`${GITHUB_URL}/users/${login}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    //console.log(response)
    if(response.status === 404){
      window.location = '/notfound'
    }
    else{
      const data = await response.json();
      //console.log(data)
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }


  const clearUsers = async()=>{
    dispatch({
      type: 'CLEAR_USERS'
    })
  }

  const setLoading = () =>{
    dispatch({type: 'SET_LOADING'})
  }

  return <GithubContext.Provider value={{
    users: state.users,
    isLoading: state.isLoading,
    user: state.user,
    repos: state.repos,
    getUsers,
    getUser,
    searchUsers,
    clearUsers,
    getUserRepos
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext; 