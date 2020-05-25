import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { hot } from "react-hot-loader";
import Cookies from "js-cookie";
import "./Dashboard.css";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", weatherDays: [] };
    }

    componentDidMount() {
        if (Cookies.get("username")) {
            this.mounted = true;
            navigator.geolocation.getCurrentPosition((p) =>
                this.fetchWeather(p.coords)
                    .then((res) => res.json())
                    .then(
                        (json) =>
                            this.mounted &&
                            this.setState({
                                weatherDays: json.consolidated_weather,
                            })
                    )
            );
        } else {
            this.props.history.push("/");
        }
    }

    fetchWeather = async (coords) => {
        let [latt, long] = [coords.latitude, coords.longitude];
        let corsProxyUrl = "https://cors-anywhere.herokuapp.com";
        let url = `${corsProxyUrl}/https://www.metaweather.com/api/location/search/?lattlong=${latt},${long}`;

        let locationsResponse = await fetch(url);
        let locations = await locationsResponse.json();
        this.setState({ title: locations[0].title });
        let woeid = locations[0].woeid;

        return fetch(
            `${corsProxyUrl}/https://www.metaweather.com/api/location/${woeid}`
        );
    };

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        let days = this.state.weatherDays.map((day, i) => {
            let keys = Object.keys(day);

            return (
                <div key={day.id} className="day">
                    {keys.map((key) => (
                        <span key={key}>
                            <b>{key}:</b> {day[key]}
                        </span>
                    ))}
                </div>
            );
        });

        return (
            <div className="Dashboard d-flex flex-column align-items-center">
                <h3 className="text-center">Dashboard</h3>
                <h4 className="text-center">{this.state.title}</h4>
                <br />
                {days.length > 0 ? (
                    <div className="days">{days}</div>
                ) : (
                    <div className="spinner-border mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
        );
    }
}

export default hot(module)(withRouter(Dashboard));
