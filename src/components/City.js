import React from 'react';
import $ from 'jquery';

global.__CITY__ = require('../static/city.json');

class City extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.json = global.__CITY__
        this.state = {
            province: '',
            city: '',
            country: '',
            provinceIndex: -1,
            cityIndex: -1,
        };
    }

    componentWillMount = () => {
        if (this.props.cityName !== '') {
            let arr = this.props.cityName.split(' ');
            this.json.map(function(array, index){
                if (array.name === arr[0] ) {
                    this.json[index].city.map(function(cityName,cityIndex){
                        if (cityName.name === arr[1]) {
                            this.setState({
                                provinceIndex:index,
                                cityIndex:cityIndex
                            });
                        }
                    }.bind(this));                
                }
            }.bind(this));
        }
    } 

    componentDidMount = () => {
        if (this.props.cityName !== '') {
            let arr = this.props.cityName.split(' ');
            $('#province').val(arr[0]);
            $('#city').val(arr[1]);
            $('#country').val(arr[2]);
        }        
    }

    provinceOption = () => {
        return this.json.map(function(array, index){
            return (<option key={index} data-index={index}>{array.name}</option>);
        });
    }

    cityOption = () => {
        if(parseInt(this.state.provinceIndex) === -1){
            return false;
        }else{
            return this.json[this.state.provinceIndex].city.map(function(array, index){
                return (<option key={index} data-index={index}>{array.name}</option>);
            });
        }
    };

    countryOption = () => {
        if(parseInt(this.state.cityIndex) === -1){
            return false;
        }else{
            return this.json[this.state.provinceIndex].city[this.state.cityIndex].area.map(function(array, index){
                return (<option key={index} data-index={index}>{array}</option>);
            });
        }
    };

    provinceChange = (event) => {
        let e = event.target;
        let val = e.value;
        let indexing = e.options[e.selectedIndex].getAttribute("data-index");
        this.refs.city.value = -1;
        this.refs.country.value = -1;

        if (parseInt(val) === -1) {
            val = '';
        }

        this.setState({
            cityIndex: -1,
            provinceIndex: indexing,
            province: e.value,
            city: '',
            country: ''
        }, () => {
            this.props.callbackParent({
                province: val,
                city: this.state.city,
                country: this.state.country
            });
        });
    };

    cityChange = (event) => {
        let e = event.target;
        let val = e.value;
        let indexing = e.options[e.selectedIndex].getAttribute("data-index");

        if (parseInt(val) === -1) {
            val = '';
        }

        this.refs.country.value = -1;

        this.setState({
            city: e.value,
            cityIndex:indexing,
            country: ''
        }, () => {
            this.props.callbackParent({
                province: this.state.province,
                city: val,
                country: this.state.country
            });
        });
    };

    countryChange = (event) => {
        let e = event.target;
        let val = e.value;
        let indexing = e.options[e.selectedIndex].getAttribute("data-index");
        if (indexing === -1) {
            this.setState({
                cityIndex:-1,
                provinceIndex:indexing
            });
            this.refs.province.value = -1;
        }

        this.setState({
            country: e.value
        })

        if (parseInt(val) === -1) {
            val = '';
        }

        this.props.callbackParent({
            province: this.state.province,
            city: this.state.city,
            country: val
        });
    }

    render(){
        return (
            <span>
                <select className="city-select" name={this.props.provinceName ? this.props.provinceName : "province"} id="province" ref="province" onChange={this.provinceChange}>
                    <option key="-1" value="-1" data-index="-1">省份</option>
                    {this.provinceOption()}
                </select>
                <select className="city-select" name={this.props.cityName ? this.props.cityName : "city"} id="city" onChange={this.cityChange} ref="city">
                    <option key="-1" value="-1" data-index="-1">地级市</option>
                    {this.cityOption()}
                </select>
                <select className="city-select" name={this.props.countryName ? this.props.countryName : "country"} id="country" onChange={this.countryChange} ref="country">
                    <option key="-1" value="-1" data-index="-1">市、县级市</option>
                    {this.countryOption()}
                </select>
            </span>
        );
    }
};

export default City;