import {DEBUG, ROOT_URL} from "../../configs/config";

export const GET_TEACHER_SCHEDULE_INFO = 'get_teacher_schedule_info'
export const GOT_TEACHER_SCHEDULE_INFO = 'got_teacher_schedule_info'
export const GET_ALL_SCHEDULE_INFO = 'get_All_Schedule_Info'
export const MODIFY_DIALOG_OPEN_STATE   = 'modify_Dialog_Open_State'
export const getTeacherScheduleInfo = (teacherName) => (dispatch, getState) => {
    fetchTeacherScheduleInfo(teacherName)
        .then((data)=>{
            dispatch({
                type: GET_TEACHER_SCHEDULE_INFO,
                data: data
            })
        })
}

function fetchTeacherScheduleInfo(teacherName) {
        return fetch(`../../Data/CourseTable.json?teacherName=${teacherName}`)
        .then(response => response.json())
}

export const getAllScheduleInfo = () => (dispatch, getState) => {
    fetchAllScheduleInfo()
        .then((data)=>{
            dispatch({
                type: GET_ALL_SCHEDULE_INFO,
                data: data
            })
        })
}
function fetchAllScheduleInfo() {
    return fetch(`../../Data/CourseTable.json`)
        .then(response => response.json())
}

export const modifyDialogOpenState = () => (dispatch, getState) => {
    dispatch({
        type: MODIFY_DIALOG_OPEN_STATE,
    })
}
