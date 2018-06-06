import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import Button from "@material-ui/core/Button";
import { lighten } from '@material-ui/core/styles/colorManipulator';

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

class CourseInList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'id',
            data: [
            ].sort((a, b) => (a.id < b.id ? -1 : 1)),
            page: 0,
            rowsPerPage: 6,
        };
        this.fetchCourses = this.fetchCourses.bind(this);
        this.fetchCourses();
    }

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

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <CourseInListToolbar/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
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
                    <Button variant="outlined" color="primary"  onClick={this.fetchCourses}>
                        显示最新课表
                    </Button>
                    <Button variant="outlined" color="primary" style={{marginLeft: 50}} onClick={this.printCourse}>
                        打印课表
                    </Button>
                </div>
            </div>
        );
    }
}

CourseInList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseInList);