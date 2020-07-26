import React from "react";
import styles from "./App.module.css";
import axios from "axios";
import {Button} from "@material-ui/core";


import Countoncard from "./helper/Countoncard/Countoncard";
import Countrydata from "./helper/Countrydata/Countrydata";
import Showonchart from "./helper/Showonchart/Showonchart";

import coronaImg from "./images/corona.png";

import { dataFetch } from "./apicall/index";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await dataFetch();
    this.setState({ data: data });
  }

  handleChange = async (country) => {
    const data = await dataFetch(country);
    this.setState({ data: data, country: country });

    const form = await axios.post("/api/data", { data, country });
    this.setState({ data: form.data, country: form.country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImg} alt="COVID-19"></img>
        <Countoncard data={data}></Countoncard>
        <Countrydata
          data={data}
          country={country}
          handleChange={this.handleChange}
        ></Countrydata>
        <Showonchart
          className="pb-10"
          data={data}
          country={country}
        ></Showonchart>

        <footer className="page-footer bg-dark">
          <div className="footer text-center py-3">
              <h1>THANK YOU!</h1>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
