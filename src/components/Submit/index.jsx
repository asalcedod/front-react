import React, { useState, useEffect } from 'react'
import { baseUrl } from './../constants/url'
import { CustomerModel } from './../Customers/CustomerModel'
import { SubmitModel } from './SubmitModel'
import Cookies from 'universal-cookie';
import Table from '../dinamic/Table'
import FormURS from '../dinamic/Forms/FormURS'
import NavMenu from '../NavMenu';
import axios from 'axios'
import FormModal from '../dinamic/Forms/FormModal';
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Button,
  Card,
  CardTitle,
  Row,
  Col
} from 'reactstrap'
import ProgressBar from '../dinamic/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './customer.css'

const Submit = (props) => {
  const cookies = new Cookies()

  const [data, setData] = useState(null)
  const [customer, setCustomer] = useState(null)

  const peticionGet = async () => {
    await axios.get(baseUrl + "customers/" + cookies.get('form').customerID)
      .then(response => {
        setCustomer(response.data)
      }).catch(error => {
        console.log(error)
      })
  }

  const getSubmit = async () => {
    await axios.get(baseUrl + "submits")
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
      if (!data) {
        peticionGet()
      }
      getSubmit()
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
              controller={baseUrl + "submits"}
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
        <Row>
          <Col xs="3">
            <div className="scrollCard">
              <Card
                body
                inverse
                style={{ backgroundColor: '#343a40', borderColor: '#212529' }}
              >
                <CardTitle>Customer</CardTitle>
                {customer ? <FormURS inputs={CustomerModel} data={customer} /> : <ProgressBar color="black" colorBar="grey"></ProgressBar>}
              </Card>
            </div>
          </Col>
          <Col>
            <h5>Submit List</h5>
            <div className="mb-3">{renderActionButtons(SubmitModel, ['create'])}</div>
            {data ? <Table title={SubmitModel} data={data} baseUrl={baseUrl + "submits"} /> : <ProgressBar color="black" colorBar="grey"></ProgressBar>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Submit
