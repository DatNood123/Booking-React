export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },

            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            { //quản lý lịch khám bệnh của bác sỹ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schudule'
            }

        ]
    },

    { //quản lý cây (phòng khám) 
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },

    { //quản lý dịch vụ (chuyen khoa)
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
];


export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //thêm lịch
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schudule'
            },

            { //lịch đặt của khách hàng
                name: 'menu.doctor.manage-customer', link: '/doctor/manage-customer'
            }
        ]
    }
];