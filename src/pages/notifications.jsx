import React from "react";
import { Grid } from "@material-ui/core";
import { AddAlert } from "@material-ui/icons";
import SimpleCard from "../component/Cards";


function notifications({ ...props }){

    return (
        <div style={{  background: '#fff' }}>
            <SimpleCard/>
            <div style={{ padding:10, background: '#fff' }}/>
            <SimpleCard/>
        </div>
    )



}

export default notifications;

