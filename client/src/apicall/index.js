import axios from "axios";

const url = process.env.REACT_APP_COVIDURL;

export const dataFetch= async (country)=>{

    let dynamicUrl = url;
    if(country){
        dynamicUrl = `${url}/countries/${country}`
    }
    try {
        const { data } = await axios.get(dynamicUrl);

        const extractedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }
        return extractedData;
        
   
    } catch (error) {
        console.log(error)
    }
}

export const dailyDataFetch= async ()=>{
    try {
        const {data} = await axios.get(`${url}/daily`);
        
        const modifiedData= data.map((daily)=>({
            confirmed: daily.confirmed.total,
            deaths: daily.deaths.total,
            date: daily.reportDate
        }))

        return modifiedData;
        
    } catch (error) {
        console.log(error)
    }
}
export const countriesNameFetch= async ()=>{
    try {
        const {data:{countries}} = await axios.get(`${url}/countries`);

        return countries.map((country)=> country.name);
    } catch (error) {
        console.log(error)
    }
}