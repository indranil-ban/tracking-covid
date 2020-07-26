import React, {useState, useEffect} from 'react';
import {dailyDataFetch} from "../../apicall/index";
import {Line, Bar} from "react-chartjs-2";

import styles from "../Showonchart/Showonchart.module.css"

const Showonchart = ({data: {confirmed, recovered, deaths}, country}) => {

    const [dailydata, setDailydata] = useState([]);

    const fetchingdailydata = async () =>{
        setDailydata(await dailyDataFetch() )
    }
    



    useEffect(()=>{
        fetchingdailydata();
    },[])

    const lineChart = (
        dailydata.length 
        ? 
        (
            <Line data={{
                labels: dailydata.map(({date})=>date),
                datasets: [{
                    data: dailydata.map(({confirmed})=>confirmed),
                    label: "Infected" ,
                    borderColor: "#3333ff",
                    fill: true
                }, {
                    data: dailydata.map(({deaths})=>deaths),
                    label: "Deaths" ,
                    borderColor: "red",
                    backgroundColor: "rgba(255,0,0,0.5)",
                    fill: true
                }]
            }}>
            </Line>
        ) : null
    )
    const barChart = (
        confirmed 
        ? (
            <Bar 
            data={{
                labels: ["Confirmed", "Recovered", "Deaths"],
                datasets: [{
                    label: "People",
                    backgroundColor: ["rgba(0,0,255,0.5)","rgba(0,255,0,0.5)","rgba(255,0,0,0.5)"],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: {display: false},
                title: {display: true, text:`Current state in ${country}`}

            }}
            >

            </Bar>
        ) : null
    );

    return ( <div className={styles.container}>
        {country? barChart: lineChart}
        
    </div>);
}
 
export default Showonchart;