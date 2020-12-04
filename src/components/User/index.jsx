import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { UserModel } from './UserModel'
import Table from './Table/index'
import NavMenu from './../NavMenu'
import md5 from 'md5'
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'universal-cookie'
import { baseUrl } from './../constants/url'
import ProgressBar from '../dinamic/ProgressBar';
import axios from 'axios'
import './user.css'

const User = (props) => {
  const cookies = new Cookies()
  const usr = cookies.get('form')
  const [firstRender, setFirstRender] = useState(true)
  const [data, setData] = useState(null)
  const [user, setUser] = useState(usr)
  const [changePass, setChangePass] = useState(false)
  const [customer, setCustomer] = useState({});
  const [rol, setRol] = useState({});

  const peticionGet = async () => {
    await axios
      .get(baseUrl + 'user/' + cookies.get('form')._id)
      .then((response) => {
        console.log(response.data.data)
        cookies.set('form', response.data.data, { path: '/' })
        setUser(response.data.data)
        setChangePass(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getUsers = async () => {
    await axios
      .get(baseUrl + 'users')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createUser = async () => {
    await axios
      .post(baseUrl + 'user', {
        identification: user.identification,
        email: user.email,
        password: changePass ? user.password : md5("123456789"),
        customerID: user.customerID,
        rol: user.rol,
        status: user.status
      })
      .then((response) => {
        peticionGet()
        getUsers()
      })
      .catch((error) => {
        debugger
        console.log(error)
      })
  }

  const updateUser = async () => {
    await axios
      .put(baseUrl + 'user/' + user.id, user)
      .then((response) => {
        cookies.set('form', response.data, { path: '/' })
        setUser(response.data)
        peticionGet()
        getUsers()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const renderRol = async () => {
    return await axios.get(baseUrl + "rols")
      .then(response => {
        let option = [<option value="DEFAULT" disabled>{`Choose a option...`}</option>]
        setRol({
          ...rol,
          rol: option.concat(response.data.data.map((val) => {
            return (<option value={val._id}>{val.name}</option>)
          }))
        })
      }).catch(error => {
        console.log(error)
      })
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser({
      ...user,
      [id]: value,
    })
    if (id === 'password') {
      setChangePass(true)
      setUser({
        ...user,
        [id]: md5(value),
      })
    }
  }

  useEffect(() => {
    if (!cookies.get('form')) {
      props.history.push('/')
    } else {
      getUsers()
      if (firstRender) {
        setFirstRender(false)
        peticionGet()
        renderRol()
      }
    }
  })
  return (
    <div className="Container">
      <NavMenu />
      {console.log(cookies.get('form'))}
      <div id="formUser">
        <div className="row pt-5">
          <div className="col-sm-12">
            <label for="usr">User:</label>
            <input
              type="text"
              className="form-control"
              name="id"
              onChange={handleChange}
              value={user ? user.identification : ''}
              id="identification"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label for="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              id="password"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label for="user">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={user ? user.email : ''}
              id="email"
            />
          </div>
          {cookies.get('form').rol.name === "Root" ? 
          <div className="col-sm-6">
            <label for="sel1">Rol:</label>
            <select
              defaultValue="DEFAULT"
              className="form-control"
              name="rol"
              onChange={handleChange}
              value={user ? user.rol : ''}
              id="rol"
            >
              {rol["rol"] ? rol["rol"] : null}
            </select>
          </div> : null}
          <div className="col-sm-6">
            <label for="sel1">Status:</label>
            <select
              className="form-control"
              defaultValue={"DEFAULT"}
              name="status"
              onChange={handleChange}
              value={user ? user.status : ''}
              id="status"
            >
              <option value="DEFAULT" disabled>{`Choose a option...`}</option>
              <option value={"1"}>Active</option>
              <option value={"0"}>Inactive</option>
            </select>
          </div>
        </div>
        <div className="row">
          {cookies.get('form').rol.name === "Root" ?
            <div className="col-sm-4 button-style">
              <button id="createUser" onClick={createUser} className="btn btn-success submit-button">
                <FontAwesomeIcon icon={faPlus} />
                {' Create'}
              </button>
            </div>
            : null}
          <div className="col-sm-4 button-style">
            <button id="updateUser" onClick={updateUser} className="btn btn-primary submit-button">
              <FontAwesomeIcon icon={faSave} />
              {' Save'}
            </button>
          </div>
        </div>
      </div>
      {cookies.get('form').rol.name === "Root" ?
        <div>
          <h5>Users List</h5>
          {data ? <Table title={UserModel} data={data.filter(function (value, index, arr) {
            return value.id != cookies.get('form')._id
          })} baseUrl={baseUrl + "users"} /> : <ProgressBar color="black" colorBar="grey"></ProgressBar>}
        </div>
        : null}
    </div>
  )
}
export default User
