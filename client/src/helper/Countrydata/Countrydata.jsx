import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./Countrydata.module.css";
import SimplePopover from "../../Modification/getinputfromfrontend"

import { countriesNameFetch } from "../../apicall/index";
const Countrydata = ({ handleChange, data, country }) => {
  const [countriesfetched, setCountriesfetched] = useState([]);

  const countriesfetching = async () => {
    setCountriesfetched(await countriesNameFetch());
  };
  useEffect(() => {
    countriesfetching();
  }, []);

  return (
    <div className={styles.container}>
      <FormControl className={styles.formControl}>
        <NativeSelect
          className={styles.NativeSelect}
          defaultValue=""
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">Global</option>
          {countriesfetched.map((coun, index) => (
            <option key={index} value={coun}>
              {coun}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      {<SimplePopover data={data} country={country} countriesfetched={countriesfetched}></SimplePopover>}
    </div>
  );
};

export default Countrydata;
