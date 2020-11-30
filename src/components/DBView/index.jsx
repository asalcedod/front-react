import React, { useState, useEffect } from 'react'
import { DatabaseModel } from './DatabaseModel'
import { baseUrl } from './../constants/url'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Table from '../dinamic/Table'
import ProgressBar from '../dinamic/ProgressBar'
import NavMenu from './../NavMenu';
import FormModal from '../dinamic/Forms/FormModal';
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Button,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DBView = (props) => {
  const cookies = new Cookies()
  const [data, setData] = useState([])

  const peticionGet = async () => {
    await axios.get(baseUrl + "databases")
      .then(response => {
        setData(response.data)
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!cookies.get('form')) {
      props.history.push('/');
    } else {
      peticionGet()
    }

  })

  const renderActionButtons = (title, actions = ['create']) => {
    const renderActions = (data) => {
      switch (data) {
        case 'create':
          return (
            <FormModal 
              modalTitle="New" 
              colorButton="success" 
              icon={faPlus} 
              controller={baseUrl + "databases"} 
              petitionType="post" 
              inputs={title}
          />
          )
        case 'edit':
          return (
            <FormModal
              modalTitle="Update"
              colorButton="primary"
              icon={faEdit}
              controller="databases"
              petitionType="put"
              textField={title}
              dataList={{}}
            />
          )
        case 'delete':
          return (
            <Button color="danger" size="sm">
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          )

        default:
          break
      }
    }
    return actions.map(renderActions)
  }

  return (
    <div>
      <NavMenu />
      <Container>
        <div className="mb-3">{renderActionButtons(DatabaseModel, ['create'])}</div>
        {data ? <Table title={DatabaseModel} data={data} baseUrl={baseUrl + "databases"} /> : <ProgressBar color="black" colorBar="grey"></ProgressBar>}
      </Container>
    </div>
  )
}

export default DBView
