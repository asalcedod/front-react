import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';
import NavMenu from './../NavMenu';
import Table from '../dinamic/Table'

const headerText = ['Name', 'Nit', 'Status', 'Actions']

const CustomersList = [
  {
    name: 'User 1',
    nit: '15975324-5',
    status: 'Active',
  },
  {
    name: 'User 2',
    nit: '756154652-7',
    status: 'Inactive',
  },
  {
    name: 'User 3',
    nit: '15476232054-6',
    status: 'Active',
  },
]

const Customers = (props) => {
  const cookies = new Cookies()

  useEffect(() => {
    if (!cookies.get('form')) {
      props.history.push('/Submit');
    }
  })

  return (
    <div>
      <NavMenu />
      <Table title={headerText} data={CustomersList} />
    </div>
  )
}

export default Customers
