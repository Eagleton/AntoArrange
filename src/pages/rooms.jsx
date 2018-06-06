import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ClassroomModifyTable from "../component/ClassroomModifyTable";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        marginLeft: 70,
    },
});
class rooms extends React.Component {
    state = {
        campusName: [],
        building: [],
        classroom: [],
        open: false
    };
    handleCampusSelect = event =>{
        this.setState({campusName: event.target.value});
    };
    handleBuildingSelect = event =>{
        this.setState({building: event.target.value});
    };
    handleClassroomSelect = event =>{
        this.setState({classroom: event.target.value});
    };
    handleDialogOpen = () => {
        this.setState({open: true})
    };
    handleClose = () => {
        this.setState({open: false})
    }
    render(){
        const {classes} = this.props;
        const campusExist=[
            '紫金港', '玉泉', '西溪', '之江', '华家池'
        ];
        const buildingInZijingang=[
            '东一A','东一B','东二'
        ];
        const buildingInYuquan=[
            '曹西201','曹西102','曹西101'
        ];
        const buildingInXixi=[
            '田家炳书院101', '田家炳书院102', '田家炳书院103'
        ];
        const classrooms = [
            '101', '102', '103', '104', '105','106'
        ];

        return (
            <div style={{padding: 24, background: '#FFF', minHeight: 550}}>
                <FormControl >
                    <InputLabel htmlFor="campusSelect">校区</InputLabel>
                    <Select
                        inputProps={{
                            name: 'campus',
                            id: 'campusSelect',
                        }}
                        value={this.state.campusName}
                        onChange={this.handleCampusSelect}
                    >
                        {campusExist.map(campusName=>(
                            <MenuItem
                                key={campusName}
                                value={campusName}
                            >
                                {campusName}
                            </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="buildingSelect">教学楼</InputLabel>
                    <Select
                        inputProps={{
                            name: 'building',
                            id: 'buildingSelect',
                        }}
                        value={this.state.building}
                        onChange={this.handleBuildingSelect}
                    >
                        {
                            (this.state.campusName==='紫金港')?
                            buildingInZijingang.map(building=>(
                                <MenuItem
                                    key={building}
                                    value={building}
                                >
                                    {building}
                                </MenuItem>

                            )):(this.state.campusName==='玉泉'?
                                    buildingInYuquan.map(building=>(
                                            <MenuItem
                                                key={building}
                                                value={building}
                                            >
                                                {building}
                                            </MenuItem>
                                        )
                                    ):buildingInXixi.map(building=>(
                                        <MenuItem
                                            key={building}
                                            value={building}
                                        >
                                            {building}
                                        </MenuItem>
                                    )
                                )

                                )
                        }
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="classroomSelect">教室</InputLabel>
                    <Select
                        inputProps={{
                            name: 'classroom',
                            id: 'classroomSelect',
                        }}
                        value={this.state.classroom}
                        onChange={this.handleClassroomSelect}
                    >
                        {classrooms.map(classroom=>(
                                <MenuItem
                                    key={classroom}
                                    value={classroom}
                                >
                                    {classroom}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                <TextField
                    id="number"
                    label="教室容量"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button variant="outlined" color="primary" onClick={this.handleDialogOpen}>
                        录入
                    </Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"教室录入结果？"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                录入成功
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                确定
                            </Button>
                        </DialogActions>
                    </Dialog>
                </FormControl>
                <div>
                    <TextField
                        id="searchRoom"
                        label="教室名称"
                        style={{marginBottom:25}}
                    />
                    <Button variant="outlined" color="primary" style={{marginLeft:65, marginTop:5, height:35}}>
                        搜索
                    </Button>
                </div>
                <ClassroomModifyTable/>
            </div>
        );
    }
}
rooms.propTypes={
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(rooms);
