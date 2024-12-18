import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser, serviceAddNewUser, serviceDeleteUser, serviceEditUser } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalAddUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalAddUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalAddUser: !this.state.isOpenModalAddUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await serviceAddNewUser(data);
            if (response && response.errCode !== 0) {
                alert(response.msg)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalAddUser: !this.state.isOpenModalAddUser
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA') //xóa dữ liệu trong modal khi tạo user thành công
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        console.log(user)
        try {
            let res = await serviceDeleteUser(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        let response = await serviceEditUser(user);
        try {
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: !this.state.isOpenModalEditUser,
                })

                await this.getAllUserFromReact();
            } else {
                alert(response.errCode)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalAddUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUserFromParent={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title text-center">
                    Manage User
                </div>
                <div className='btn-new-user'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    ><i className='fas fa-plus'></i> Add New User</button>
                </div>
                <div className="user-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td className="btn-outline">
                                                <button className='btn-edit'
                                                    onClick={() => { this.handleEditUser(item) }}
                                                ><i className="fas fa-edit"></i></button>
                                                <button className='btn-delete'
                                                    onClick={() => { this.handleDeleteUser(item) }}
                                                ><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
