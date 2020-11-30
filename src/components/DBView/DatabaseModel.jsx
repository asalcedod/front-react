export const DatabaseModel = [{
    id: 'server',
    name: 'Server',
    type: 'text', 
    form: true,
    grid: true
},
{
    id: 'databaseName',
    name: 'Database Name',
    type: 'text', 
    form: true,
    grid: true
    
},
{
    id: 'user',
    name: 'User',
    type: 'email', 
    form: true,
    grid: true
    
},
{
    id: 'password',
    name: 'Password',
    type: 'password', 
    form: true,
    grid: true
},
{
    id: 'customerID',
    name: 'Customer',
    type: 'select', 
    foreign: {
        controller: 'customers',
        key: 'id'
    },
    form: true,
    grid: false
},
{
    id: 'status',
    name: 'Status',
    type: 'select', 
    options: [{
        name: 'Active',
        value: '1'
    },
    {
        name: 'Inactive',
        value: '0'
    }],
    form: true,
    grid: true
},{
    id: 'actions',
    name: 'Actions',
    type: 'text', 
    form: false,
    grid: true
}, {
    id: 'childrens',
    name: 'Childrens',
    children: {
        customerID: null,
    },
    form: false,
    grid: false
}]