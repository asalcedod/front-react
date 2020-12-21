import React, { useState, useEffect } from 'react'
import { baseUrl } from './../constants/url'
import { CategoryModel } from './CategoryModel'
import Cookies from 'universal-cookie';
import Table from '../dinamic/Table'
import NavMenu from '../NavMenu';
import axios from 'axios'
import FormModal from '../dinamic/Forms/FormModal';
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Button,
} from 'reactstrap'
import ProgressBar from '../dinamic/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Category = (props) => {
  const cookies = new Cookies()

  const [data, setData] = useState(null)

  const getCategory = async () => {
    await axios.get(baseUrl + "categories")
      .then(response => {
        setData(response.data.data)
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!cookies.get('form')) {
      props.history.push('/');
    } else {
      getCategory()
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
              controller={baseUrl + "category"}
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
              controller={baseUrl + "category"}
              petitionType="put"
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
    <div className="Container">
      <NavMenu />
      <Container>
        <h5>Category List</h5>
        <div>{renderActionButtons(CategoryModel, ['create'])}</div>
        {data ? <Table title={CategoryModel} data={data} baseUrl={baseUrl + "category"} /> : <ProgressBar color="black" colorBar="grey"></ProgressBar>}
      </Container>
    </div>
  )
}

export default Category
