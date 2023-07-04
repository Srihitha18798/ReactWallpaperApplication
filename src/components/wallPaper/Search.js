/*
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component  {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: 'GET AN API KEY AT https://pixabay.com/',
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render(){
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
*/

import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import axios from "axios";
import Card from "./Card";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [amount, setAmount] = useState(15);
  const apiUrl = "https://pixabay.com/api";
  const apiKey = "36640679-dc2aaae3a351ed4be072add95";
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`
      )
      .then((res) => setImages(res.data.hits))
      .catch((err) => console.log(err));
  }, [searchText, amount]);

  const onTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const onAmountChange = (e, index, value) => {
    setAmount(value);
  };

  console.log("search images");
  console.log(images);

  return (
    <div>
      <TextField
        name="searchText"
        value={searchText}
        onChange={(event) => onTextChange(event)}
        floatinglabeltext="Search For Images"
        fullWidth={true}
        variant="standard"
        style={{ color: "black" }}
      />
      <br />
      <Select
        name="amount"
        floatinglabeltext="Amount"
        value={amount}
        onChange={onAmountChange}
      >
        <MenuItem value={5} primaryText="5" />
        <MenuItem value={10} primaryText="10" />
        <MenuItem value={15} primaryText="15" />
        <MenuItem value={30} primaryText="30" />
        <MenuItem value={50} primaryText="50" />
      </Select>
      <br />

      <Card images={images} />
    </div>
  );
};

export default Search;
