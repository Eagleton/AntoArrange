import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Arranging from "../component/Arranging";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ModifyTable from "../component/ModifyTable";

function arranging({ ...props }) {
    return (
        <div style={{  background: '#fff' }}>
            <Arranging/>
            <div style={{padding: 10,height:35}}/>
            <TextField
                id="searchTeacher"
                label="教师姓名"
            />
            <Button variant="outlined" color="primary" style={{marginLeft:10, height:35}} >
                搜索
            </Button>
            <ModifyTable/>
        </div>

    );
}

arranging.propTypes = {
    classes: PropTypes.object.isRequired
};

export default arranging;
