export const UserModel = [
    {
        id: 'identification',
        name: 'Identification',
        type: 'text',
        form: true,
        grid: true

    },
    {
        id: 'email',
        name: 'Email',
        type: 'email',
        form: true,
        grid: true

    },
    {
        id: 'password',
        name: 'Password',
        type: 'password',
        form: true,
        grid: false

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
        id: 'rolID',
        name: 'Rol',
        type: 'select',
        foreign: {
            controller: 'rols',
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
    }, {
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
            rolID: null
        },
        form: false,
        grid: false
    }
]