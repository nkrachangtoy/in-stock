import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import "./style/main.css";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import Warehouses from "./components/Warehouses";
import Products from "./components/Products";
import CreateNewItem from "./components/CreateNewItem";
import CreateNewLocation from "./components/CreateNewLocation";

import WarehouseDetail from "./components/WarehouseDetail";

class App extends Component {
  state = {
    warehouseList: [],
    warehouseDetail: {},
  };

  componentDidMount() {
    this.getWarehouses();
    this.getWarehouseDetail();
    console.log("Comp mounted");
  }

  /**
   * This function will get all the warehouses and update state
   */
  getWarehouses() {
    axios
      .get(`/warehouses`)
      .then((response) => {
        this.setState({
          warehouseList: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  /**
   *  This function will get detail about warehouse
   */
  getWarehouseDetail(id) {
    axios
      .get(`/warehouse/${id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          warehouseDetail: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    console.log("Comp updated");
    // this.getWarehouseDetail(this.props.match.params.id);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Redirect from="/" to="/inventory" />
        <Switch>
          <Route path="/inventory" component={Inventory} exact />
          <Route
            path="/warehouses"
            render={(props) => (
              <Warehouses warehouses={this.state.warehouseList} {...props} />
            )}
          />
          <Route
            path="/warehouse/:id"
            render={(props) => (
              <WarehouseDetail
                warehouses={this.state.warehouseList}
                {...props}
              />
            )}
          />
          <Route path="/product/:id" component={Products} exact />
          <Redirect to="/inventory" from="/" exact />
          <Redirect to="/inventory" from="/product" exact />
        </Switch>
        <CreateNewItem />
        <CreateNewLocation />
      </div>
    );
  }
}

export default withRouter(App);
