import Plot from 'react-plotly.js';
import {useState, useEffect} from "react";
import {Container, Slider, Button, Checkbox, FormControlLabel, ListItem, Grid, List} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as React from 'react';
import { red, blue, green} from '@mui/material/colors';
import $ from "jquery";
import { useQuery } from 'react-query'

const base_url = 'https://voyages3-api.crc.rice.edu/'
const token = 'Token 3e9ed2e0fa70a1a5cb6f34eb7a30ebde208ecd8f'

function App() {
    const [first, setFirst] = useState(1);
    const [second, setSecond] = useState(2);
    const [third, setThird] = useState(3);
    const [markColor, setMarkColor] = useState("red");
    const [lineColor, setLineColor] = useState("red");
    const [markSize, setMarkSize] = useState(12);
    const [labels, setLabels] = useState([]);
    // let labels = new Set();

    const { isLoading, error, data: options } = useQuery('repoData', () => {
            return fetch(base_url + "voyage/", {
                method: "OPTIONS",
                headers: {'Authorization': token}
            }).then(res => res.json())
        }
    )

    function isChildren(key) {
        return key !== "type" && key !== "label" && key !== "flatlabel"
    }

    function isLast(node) {
        return Object.keys(node).length <= 3
    }

    // const a = {id:1, label: "a", b: {id:2, label: "b"}, c: {id: 3, label:"c", d: {id: 4, label: "d"}}}
    // console.log(Object.keys(a).length)
    var count = 0;
    const renderTree = (nodes, key) => (
        <TreeItem key={key} nodeId={""+count++} label={nodes.label}>
            { Object.keys(nodes).map((key) =>
                isChildren(key)
                ? isLast(nodes[key])
                        ? <ListItem key={key} disablePadding>
                            <Checkbox  onChange={(event, checked) => handleCheck(checked, nodes[key].flatlabel)}/>
                            {key}
                        </ListItem>
                        : renderTree(nodes[key], key)
                : null
                )
            }
        </TreeItem>
    );

    function handleCheck(isChecked, label){
        if (isChecked) {
            setLabels([...labels, label])
        }else{
            setLabels(labels.filter((i) => i !== label))
        }
        console.log(labels)
    }

    // function handleOnClick() {
    //     var formdata = new FormData();
    //     formdata.append("hierarchical", "False");
    //     fetch(base_url + "voyage/", {
    //         method: "POST",
    //         body: formdata,
    //         headers: {'Authorization': token}
    //     }).then(res => res.json()).then(res => {
    //         console.log(res);
    //     })
    //     console.log(formdata);
    // }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Container>
            {/*<Button onClick={handleOnClick}>run get option</Button>*/}
            <Grid container>
                <Grid item xs={8}>
                    <TreeView
                        aria-label="option menu"
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpandIcon={<ChevronRightIcon/>}
                        sx={{height: 500, flexGrow: 1, maxWidth: 800, overflowY: 'auto'}}
                    >
                        {renderTree(options)}
                        {/*<TreeItem nodeId="1" label="Setting">*/}
                        {/*    <TreeItem nodeId="2" label="Mark">*/}
                        {/*        <TreeItem nodeId="3" label="Color">*/}
                        {/*            <TreeItem nodeId="4" label="Red" onClick={() => {setMarkColor("red")}}/>*/}
                        {/*            <TreeItem nodeId="5" label="Blue" onClick={() => {setMarkColor("blue")}}/>*/}
                        {/*            <TreeItem nodeId="6" label="Green" onClick={() => {setMarkColor("green")}}/>*/}
                        {/*        </TreeItem>*/}
                        {/*        <TreeItem nodeId="7" label="Size">*/}
                        {/*            <TreeItem nodeId="8" label="8" onClick={() => {setMarkSize(8)}}/>*/}
                        {/*            <TreeItem nodeId="9" label="16" onClick={() => {setMarkSize(16)}}/>*/}
                        {/*            <TreeItem nodeId="10" label="32" onClick={() => {setMarkSize(32)}}/>*/}
                        {/*        </TreeItem>*/}
                        {/*    </TreeItem>*/}
                        {/*    <TreeItem nodeId="11" label="Line">*/}
                        {/*        <TreeItem nodeId="12" label="Color">*/}
                        {/*            <TreeItem nodeId="13" label="Red" onClick={() => {setLineColor("red")}}/>*/}
                        {/*            <TreeItem nodeId="14" label="Blue" onClick={() => {setLineColor("blue")}}/>*/}
                        {/*            <TreeItem nodeId="15" label="Green" onClick={() => {setLineColor("green")}}/>*/}
                        {/*        </TreeItem>*/}
                        {/*    </TreeItem>*/}
                        {/*</TreeItem>*/}
                    </TreeView>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        {labels.map((item) => <ListItem key={item}>{item}</ListItem>)}
                    </List>
                </Grid>
            </Grid>


            <header>First: 0~100 step: 10</header>
            <Slider
                aria-label="first"
                value={first}
                onChange={(e, v) => {setFirst(v)}}
                max={100}
                min={0}
                step={10}
            />
            <header>Second: 50~150</header>
            <Slider
                aria-label="second"
                value={second}
                onChange={(e, v) => {setSecond(v)}}
                max={150}
                min={50}
                color="secondary"
            />
            <header>Third: -50~50</header>
            <Slider
                aria-label="third"
                value={third}
                onChange={(e, v) => {setThird(v)}}
                max={50}
                min={-50}
            />

            <Plot
                data={[
                    {
                        y: [first, second, third],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: markColor, size: markSize},
                        line: {color: lineColor}
                    },
                ]}
                // layout={{
                //     updatemenus: [
                //         {
                //             y: 0.8,
                //             yanchor: 'top',
                //             buttons: [{
                //                 method: 'restyle',
                //                 args: ['line.color', 'red'],
                //                 label: 'red'
                //             }, {
                //                 method: 'restyle',
                //                 args: ['line.color', 'blue'],
                //                 label: 'blue'
                //             }, {
                //                 method: 'restyle',
                //                 args: ['line.color', 'green'],
                //                 label: 'green'
                //             }]
                //         }]
                // }}
            />
        </Container>
    );
}

export default App;
