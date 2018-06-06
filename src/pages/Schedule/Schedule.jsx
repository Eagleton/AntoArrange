import React from "react";
import PropTypes from "prop-types";
import { withStyles} from "@material-ui/core";
import dashboardStyle from "../../assets/jss/dashboardStyle";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from "@material-ui/core/styles/colorManipulator";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {connect} from "react-redux";
import {getAllScheduleInfo, getTeacherScheduleInfo} from "./actions";


import CourseInTable from "../../component/CourseInTable";


const columnData = [
    { id: 'id', numeric: true},
    { id: 'courseId', numeric: false, disablePadding: true, label: '课程代号' },
    { id: 'courseName', numeric: false, disablePadding: false, label: '课程名称' },
    { id: 'teacherName', numeric: false, disablePadding: false, label: '教师姓名' },
    { id: 'semester', numeric: false, disablePadding: false, label: '学期' },
    { id: 'courseTime', numeric: false, disablePadding: false, label: '上课时间' },
    { id: 'place', numeric: false, disablePadding: false, label: '上课地点' },
];
class CourseInListHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;
        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

CourseInListHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let CourseInListToolbar = props => {
    const { classes } = props;
    return (
        <Toolbar>
            <div className={classes.title}>
                <Typography variant="title" id="tableTitle">
                    当前所有课程信息
                </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};

CourseInListToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

CourseInListToolbar = withStyles(toolbarStyles)(CourseInListToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});
let open = false;

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            listMode: true,
            tableMode: false,
            order: 'asc',
            orderBy: 'id',
            data: [
            ].sort((a, b) => (a.id < b.id ? -1 : 1)),
            page: 0,
            rowsPerPage: 6,
        };
        this.fetchCourses = this.fetchCourses.bind(this);
        this.fetchCourses();
    };
    componentDidMount() {
        this.props.showAllCourseSchedule
    };

    fetchCourses = () => {
        fetch(`../../Data/CourseTable.json`)
            .then(response => { return response.json()})
            .then(data=>this.setState({data:data.courses}))
            .catch(e=>{console.log("Fuck error!")})
    };

    printCourse = () =>{
        let courseToPrint = document.getElementById('allOfCourses');
        let newWin = window.open("");
        newWin.document.write(courseToPrint.outerHTML);
        newWin.document.close();
        newWin.print();
        newWin.close();
    };
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
        this.setState({ data, order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleChange = name => event => {
        if(name==='listMode') {
            if(this.state.listMode===false) {
                this.setState({[name]: event.target.checked});
                this.setState({'tableMode': false});
            }
        }
        else{
            if(this.state.tableMode===false){
                this.setState({[name]: event.target.checked});
                this.setState({'listMode': !event.target.checked});
            }
        }
    };
    handleClose = () => {
        open: false
    }

    render() {
        const { classes, handleSearchButtonClick, showAllCourseSchedule} = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;
        const data = this.props.data;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        if(this.state.listMode){ //列表模式
            return(
                <div style={{ padding: 24, background: '#fff', minHeight: 550 }}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Radio
                                    color="primary"
                                    value="listMode"
                                    checked={this.state.listMode}
                                    onChange={this.handleChange('listMode')}
                                />
                            }
                            label="列表模式"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    color="primary"
                                    value="tableMode"
                                    checked={this.state.tableMode}
                                    onChange={this.handleChange('tableMode')}
                                />
                            }
                            label="表格模式"
                        />
                        <TextField
                            id="searchTeacher"
                            label="教师姓名"
                            // defaultValue="李莹"
                            style={{marginLeft:550, marginBottom:25}}
                        />
                        <Button variant="outlined" color="primary" style={{marginLeft:10, marginTop:20, height:35}} onClick={handleSearchButtonClick}>
                            搜索
                        </Button>
                        <Dialog
                            open={open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"确认显示该教师所有课表？"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    目标教师课表将会被显示
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    确认
                                </Button>
                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    取消
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </FormGroup>
                    <Paper className={classes.paper}>
                        <CourseInListToolbar/>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle" id="allOfCourses">
                                <CourseInListHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                />
                                <TableBody>
                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                        return (
                                            <TableRow
                                                tabIndex={-1}
                                                key={n.id}
                                            >
                                                <TableCell >{ }</TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n.courseId}
                                                </TableCell>
                                                <TableCell >{n.courseName}</TableCell>
                                                <TableCell>{n.teacherName}</TableCell>
                                                <TableCell>{n.semester}</TableCell>
                                                <TableCell>{n.courseTime}</TableCell>
                                                <TableCell>{n.place}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
                    <div style={{paddingTop: 20, textAlign:"end"}}>
                        <Button variant="outlined" color="primary"  onClick={showAllCourseSchedule}>
                            显示最新课表
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginLeft: 50}} onClick={this.printCourse}>
                            打印课表
                        </Button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div style={{padding: 24, background: '#fff', minHeight: 550}}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Radio
                                    color="primary"
                                    value="listMode"
                                    checked={this.state.listMode}
                                    onChange={this.handleChange('listMode')}
                                />
                            }
                            label="列表模式"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    color="primary"
                                    value="tableMode"
                                    checked={this.state.tableMode}
                                    onChange={this.handleChange('tableMode')}
                                />
                            }
                            label="表格模式"
                        />
                        <TextField
                            id="searchTeacher"
                            label="教师姓名"
                            style={{marginLeft: 550, marginBottom: 25}}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{marginLeft: 10, marginTop: 20, height: 35}}
                            onClick={handleSearchButtonClick}
                        >
                            搜索
                        </Button>
                    </FormGroup>
                    <CourseInTable/>
                </div>
            );
        }
    }
}

Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSearchButtonClick: PropTypes.func.isRequired
};
function showDialog(){
    open: true
    console.log(open)
}
function mapStateToProps(state) {
    return{
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) =>({
    handleSearchButtonClick: () => dispatch(
        getTeacherScheduleInfo(document.getElementById("searchTeacher").value),
        showDialog()
        ),
    showAllCourseSchedule : () => dispatch(getAllScheduleInfo()),
});

const ScheduleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule);

export default withStyles(dashboardStyle)(ScheduleContainer);
