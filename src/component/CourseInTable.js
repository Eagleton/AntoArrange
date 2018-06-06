import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const CourseInTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
    },
    body: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#fafafa",
        },
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '97%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    cell0:{
        width:"13%",
        textAlign: 'center',
    },
    cell: {
        paddingTop: 35,
        paddingBottom: 35,
        backgroundColor:"#f0f0f0",
    },
});

const TIMES = ["第一节\n第二节", "第三节\n第四节\n第五节", "休息", "第六节\n第七节\n第八节", "第九节\n第十节", "休息", "第十一节\n第十二节\n第十三节", "休息"];

const data = [];

for(let i=0; i<8; i++){
    data.push({id:i+1,label:TIMES[i]});
}
const getCourse = (d, id) => {
    switch(id){
        case 1: return d["12"] ? d["12"] : "";
        case 2: return d["345"] ? d["345"] : (d["34"] ? d["34"] : "");
        case 4: return d["678"] ? d["678"] : (d["78"] ? d["78"] : "");
        case 5: return d["910"] ? d["910"] : "";
        case 7: return d["111213"] ? d["111213"] : (d["1112"] ? d["1112"] : "");
        default: return "";
    }
};

let idt=0;
const getCourseCell = (course) => {
    return (
        <CourseInTableCell>
            {course==="" ? "" : course.map( (text) => {
                return (
                    <Typography align="center" key={"ct_"+idt++}>
                        {text}
                    </Typography>
                );})}
        </CourseInTableCell>
    );
};

const printCourseInTable = () =>{
    console.log('???');
};
function CourseInTable(props) {
    let courses = {
        "mon": {
            "345": ["编译原理", "玉泉曹西-201 李莹"],
        },
        "tue": {
            "345": ["计算机网络", "玉泉教7-308 邱劲松"],
        },
        "wed":{
            "345": ["微观经济学", "紫金港东2-301 赖普清"],
        },
        "thu": {
            "78": ["软件工程", "玉泉曹西-202 王章野"],
        },
        "fri":{
            "12": ["软件工程实践", "玉泉曹西-201 金波"],
            "345": ["B/S体系软件设计", "玉泉曹西-201 胡晓军"],
        },

    };

    const { classes } = props;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table className={classes.table} style={{border:1}} id="allOfCourses">
                    <TableHead>
                        <TableRow>
                            <CourseInTableCell style={{width:30}}>时间</CourseInTableCell>
                            <CourseInTableCell className={classes.cell0}>星期一</CourseInTableCell>
                            <CourseInTableCell className={classes.cell0}>星期二</CourseInTableCell>
                            <CourseInTableCell className={classes.cell0}>星期三</CourseInTableCell>
                            <CourseInTableCell className={classes.cell0}>星期四</CourseInTableCell>
                            <CourseInTableCell className={classes.cell0}>星期五</CourseInTableCell>
                            <CourseInTableCell className={classes.cell0}>星期六</CourseInTableCell>
                            <CourseInTableCell className={classes.cell0}>星期日</CourseInTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(n => {
                            return (
                                <TableRow className={classes.row} key={n.id}>
                                    { n.id===3||n.id===6||n.id===8 ? <CourseInTableCell>{n.label}</CourseInTableCell>
                                        : <CourseInTableCell className={classes.cell}>{n.label}</CourseInTableCell>}
                                    {getCourseCell(courses["mon"] ? getCourse(courses["mon"], n.id) : "")}
                                    {getCourseCell(courses["tue"] ? getCourse(courses["tue"], n.id) : "")}
                                    {getCourseCell(courses["wed"] ? getCourse(courses["wed"], n.id) : "")}
                                    {getCourseCell(courses["thu"] ? getCourse(courses["thu"], n.id) : "")}
                                    {getCourseCell(courses["fri"] ? getCourse(courses["fri"], n.id) : "")}
                                    {getCourseCell(courses["sat"] ? getCourse(courses["sat"], n.id) : "")}
                                    {getCourseCell(courses["sun"] ? getCourse(courses["sun"], n.id) : "")}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
            <div style={{paddingTop: 20, textAlign:"end"}}>
                <Button variant="outlined" color="primary">
                    显示最新课表
                </Button>
                <Button variant="outlined" color="primary" style={{marginLeft: 50}} onClick={printCourseInTable}>
                    打印课表
                </Button>
            </div>
        </div>
    );
}

CourseInTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseInTable);