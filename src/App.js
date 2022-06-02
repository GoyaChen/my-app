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
    Card, CardContent, CardHeader, Box, Paper, Chip
} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as React from 'react';
import { red, blue, green} from '@mui/material/colors';
import { useQuery } from 'react-query'
import { styled } from '@mui/material/styles';
const base_url = 'https://voyages3-api.crc.rice.edu/'
const token = 'Token 0bfda2118118484d52aeec86812269aadeb37c67'

function App() {
    const [first, setFirst] = useState(1);
    const [second, setSecond] = useState(2);
    const [third, setThird] = useState(3);
    const [markColor, setMarkColor] = useState("red");
    const [lineColor, setLineColor] = useState("red");
    const [markSize, setMarkSize] = useState(12);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState("");

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
    const renderTree = (nodes, name) => (
        <TreeItem key={nodes.label} nodeId={""+count++} label={nodes.label? nodes.label:"menu"}>
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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
            headers: {'Authorization': token}
        }).then(res => res.json()).then(res => {
            setData(res);
        })
        console.log(data);
    }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Container>
            <Button onClick={handleOnClick}>run get option</Button>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card>
                        <CardContent>
                            <TreeView
                                aria-label="option menu"
                                defaultCollapseIcon={<ExpandMoreIcon/>}
                                defaultExpandIcon={<ChevronRightIcon/>}
                                sx={{height: 500, flexGrow: 1, maxWidth: 800, overflowY: 'auto'}}
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
                    <Card>
                        <CardHeader
                            title="Selected Options"
                        />
                        <CardContent>
                            <Box sx={{ flexGrow: 1, height: 420, overflowY: 'auto'}}>
                                <Grid container spacing={2}>
                                    {labels.map((item) =>
                                        <Grid item>
                                            <Chip label={item} color="primary" />
                                        </Grid>)}
                                </Grid>
                            </Box>
                            <List >


                            </List>
                        </CardContent>
                    </Card>
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
