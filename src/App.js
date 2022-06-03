import Plot from 'react-plotly.js';
import {useState, useEffect} from "react";
import {
    Container,
    Slider,
    Button,
    Checkbox,
    FormControlLabel,
    ListItem,
    Grid,
    List,
    ListItemText,
    Card, CardContent, CardHeader, Box, Paper, Chip, TextField
} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as React from 'react';
import { useQuery } from 'react-query'
import { NavLink, useNavigate } from 'react-router-dom';
import {base_url, headers} from "./status";

function App() {
    let navigate = useNavigate();
    const [first, setFirst] = useState(1);
    const [second, setSecond] = useState(2);
    const [third, setThird] = useState(3);
    const [markColor, setMarkColor] = useState("red");
    const [lineColor, setLineColor] = useState("red");
    const [markSize, setMarkSize] = useState(12);
    const [labels, setLabels] = useState([]);
    // var data = "init value";
    const [data, setData] = useState("init value");

    const { isLoading, error, data: options } = useQuery('repoData', () => {
            return fetch(base_url + "voyage/", {
                method: "OPTIONS",
                headers: headers
            }).then(res => res.json())
        }
    )

    function isChildren(key) {
        return key !== "type" && key !== "label" && key !== "flatlabel"
    }

    function isLast(node) {
        return Object.keys(node).length <= 3
    }

    var count = 0;
    const renderTree = (nodes, name) => (
        <TreeItem key={nodes.label} nodeId={""+count++} label={nodes.label? nodes.label:"Menu"}>
            { Object.keys(nodes).map((key) =>
                isChildren(key)
                ? isLast(nodes[key])
                        ? <ListItem key={key} disablePadding>
                            <Checkbox  onChange={(event, checked) => handleCheck(checked, name ? (name.slice(2)+"__"+key) : key)}/>
                            <ListItemText primary={key+" ("+nodes[key].flatlabel+")"} secondary={nodes[key].type}/>
                        </ListItem>
                        : renderTree(nodes[key], name+"__"+key)
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

    function handleOnClick() {
        var formdata = new FormData();
        formdata.append("hierarchical", "False");
        fetch(base_url + "voyage/", {
            method: "POST",
            body: formdata,
            headers: {'Authorization': headers}
        }).then(res => res.json()).then(res => {
            setData(res);
            // data = res;
        })
        console.log(data);
    }

    function handleClick(event) {
        event.preventDefault();
        navigate("/table");
    }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Container>
            <Button onClick={handleClick}>Table</Button>
            <NavLink to={"/table"}>table</NavLink>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card sx={{height: 500, flexGrow: 1, maxWidth: 800, overflowY: 'auto'}}>
                        <CardContent>
                            <TreeView
                                aria-label="option menu"
                                defaultCollapseIcon={<ExpandMoreIcon/>}
                                defaultExpandIcon={<ChevronRightIcon/>}
                            >
                                {renderTree(options, "")}
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
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card  sx={{ flexGrow: 1, height: 500, overflowY: 'auto'}}>
                        <CardHeader
                            title="Selected Options"
                        />
                        <CardContent>
                            <Box>
                                <Grid container spacing={2}>
                                    {labels.map((item) =>
                                        <Grid item>
                                            <Chip label={item} color="primary" />
                                        </Grid>)}
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Container>
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
                />
            </Container>

            <Container>
                <Card>
                    <CardHeader title={"WhiteBoard"}/>
                    <CardContent>
                        <p>asdqwdvfqwdas</p>
                        <Button onClick={handleOnClick}>run get option</Button>
                        {/*<TextField id="outlined-basic" label="Outlined" variant="outlined"/>*/}
                        <p>{JSON.stringify(data)}</p>
                    </CardContent>
                </Card>
            </Container>

        </Container>
    );
}

export default App;
