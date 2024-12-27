import actionTypes from './actionTypes';
import { serviceGetAllCode, serviceAddNewUser, getAllUser, serviceDeleteUser, serviceEditUser } from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await serviceGetAllCode('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("Error", e)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    dataOfAction: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED

})

export const fetchRoleStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            let res = await serviceGetAllCode('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("Error", e)
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    dataOfAction: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const fetchPositionStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await serviceGetAllCode('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("Error", e)
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    dataOfAction: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await serviceAddNewUser(data)
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!!!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Create a new user error @@")
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("Error", e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log("Error", e)
        }
    }

}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await serviceDeleteUser(userId)
            if (res && res.errCode === 0) {
                toast.error("Delete a user succeed!!!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete a user error @@")
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("Error", e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await serviceEditUser(inputData)
            if (res && res.errCode === 0) {
                toast.warn("Update a user succeed!!!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update a user error @@")
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log("Error", e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})