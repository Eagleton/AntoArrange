import {
    GET_ALL_SCHEDULE_INFO,
    GET_TEACHER_SCHEDULE_INFO,
    GOT_TEACHER_SCHEDULE_INFO,
    MODIFY_DIALOG_OPEN_STATE
} from "./actions";

const initState = {
    listMode: true,
    tableMode: false,
    order: 'asc',
    orderBy: 'id',
    data: [],
    page: 0,
    rowsPerPage: 6,
}

export function getTeacherScheduleInfo(state = initState, action) {
    switch (action.type){
        case GET_ALL_SCHEDULE_INFO:
            return {...state, data: action.data.courses}
        case GET_TEACHER_SCHEDULE_INFO:{
            return {...state, data: initState.data}
        }
        case GOT_TEACHER_SCHEDULE_INFO:
            return state
        default: return state
    }
}
export default  getTeacherScheduleInfo;