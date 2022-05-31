import Plot from 'react-plotly.js';
import {useState, useEffect} from "react";
import {Container, Slider, Button} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as React from 'react';
import { red, blue, green} from '@mui/material/colors';
import $ from "jquery";

const base_url = 'https://voyages3-api.crc.rice.edu/'
const token = 'Token 3e9ed2e0fa70a1a5cb6f34eb7a30ebde208ecd8f'

function App() {
    const [first, setFirst] = useState(1);
    const [second, setSecond] = useState(2);
    const [third, setThird] = useState(3);
    const [markColor, setMarkColor] = useState("red");
    const [lineColor, setLineColor] = useState("red");
    const [markSize, setMarkSize] = useState(12);
    const [lineSize, setLineSize] = useState(12);
    // function handleOnClick() {
    //     // $.ajax({
    //     //     url: base_url + 'voyage/',
    //     //     headers: {'Authorization': token},
    //     //     method: 'option',
    //     // });
    //
    //     // create a new XMLHttpRequest
    //     var xhr = new XMLHttpRequest()
    //
    //     // get a callback when the server responds
    //     xhr.addEventListener('load', () => {
    //         // update the state of the component with the result here
    //         console.log(xhr.responseText)
    //     })
    //     // open the request with the verb and the url
    //     xhr.open('GET', 'https://baijiahao.baidu.com/s?id=1716741332160365777&wfr=spider&for=pc')
    //     // send the request
    //     xhr.send()
    //
    //     // fetch(base_url + 'voyage/', {
    //     //     method: "POST",
    //     //     mode: "cors",
    //     //     body: JSON.stringify({hierarchical: false}),
    //     //     headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token},
    //     //     credentials: 'include',
    //     // }).then(res => res.json()).then(res => {
    //     //     console.log(res)
    //     // })
    // }

    return (
        <Container>
            {/*<Button onClick={handleOnClick}>run get option</Button>*/}
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                sx={{height: 240, flexGrow: 1, maxWidth: 500, overflowY: 'auto'}}
            >
                <TreeItem nodeId="1" label="Setting">
                    <TreeItem nodeId="2" label="Mark">
                        <TreeItem nodeId="3" label="Color">
                            <TreeItem nodeId="4" label="Red" onClick={() => {setMarkColor("red")}}/>
                            <TreeItem nodeId="5" label="Blue" onClick={() => {setMarkColor("blue")}}/>
                            <TreeItem nodeId="6" label="Green" onClick={() => {setMarkColor("green")}}/>
                        </TreeItem>
                        <TreeItem nodeId="7" label="Size">
                            <TreeItem nodeId="8" label="8" onClick={() => {setMarkSize(8)}}/>
                            <TreeItem nodeId="9" label="16" onClick={() => {setMarkSize(16)}}/>
                            <TreeItem nodeId="10" label="32" onClick={() => {setMarkSize(32)}}/>
                        </TreeItem>
                    </TreeItem>
                    <TreeItem nodeId="11" label="Line">
                        <TreeItem nodeId="12" label="Color">
                            <TreeItem nodeId="13" label="Red" onClick={() => {setLineColor("red")}}/>
                            <TreeItem nodeId="14" label="Blue" onClick={() => {setLineColor("blue")}}/>
                            <TreeItem nodeId="15" label="Green" onClick={() => {setLineColor("green")}}/>
                        </TreeItem>
                    </TreeItem>
                </TreeItem>

            </TreeView>

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
