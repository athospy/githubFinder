
import {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
  const [text, setText] = useState('')

  const {users, searchUsers, clearUsers} = useContext(GithubContext)

  const {setAlert} = useContext(AlertContext)

  const handleChange = (e)=>{
    //console.log(e.target.value)
    setText(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(text === ''){
      setAlert("Favor intruducir algo para buscar", 'error')
    }
    else{
      //@todo search users
      searchUsers(text)
      setText('')
    }

  }


  return (
    <div className="grid grid-cols-1 gap-8 mb-8 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2">
      <div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="relative">
                <input type="text" className="w-full pr-40 text-black bg-gray-200 input input-lg" 
                placeholder="Search"
                value={text}
                onChange={handleChange} />
                <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg" 
                type="submit">
                  go
                </button>
              </div>
            </div>
          </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={clearUsers}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
