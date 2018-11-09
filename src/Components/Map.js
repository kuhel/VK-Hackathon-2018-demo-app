import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import './Map.css';

const mapStyles = {
	width: '100%',
	height: '480px'
};

const defaultPlace = {
	lat: 59.93567648187513,
	lng: 30.32374651609689,
}

export class MapContainer extends Component {
	state = {
		activeMarker: {},
		selectedPlace: {},
		showingInfoWindow: false,
		places: []
	};
	
	  onMarkerClick = (props, marker) => {
			this.setState({
				activeMarker: marker,
				selectedPlace: props,
				showingInfoWindow: true
			});
		}
	
	onInfoWindowClose = () =>
		this.setState({
			activeMarker: null,
			showingInfoWindow: false
		});
	
	onMapClicked = () => {
		if (this.state.showingInfoWindow) {
			this.setState({
				activeMarker: null,
				showingInfoWindow: false
			});
		}
	};

	onMapReady = (mapProps, map) => this.searchNearby(map, map.center);

	searchNearby = (map, center) => {
		const { google } = this.props;

		const service = new google.maps.places.PlacesService(map);
		console.log('center', center);

		const request = {
			location: {
				lat: center.lat(), 
				lng: center.lng()
			},
			radius: 1500,
			type: ['museum']
		};

		service.nearbySearch(request, (results, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				this.setState({ places: results });
			}
		});
	};

	renderPlace = (place) => 
		<Marker
			key={place.name}
			name={place.name}
			onClick={this.onMarkerClick}
			position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
			rating={place.rating}
			pic={place.icon}
		/>

	render() {
		return (
		<Map
			google={this.props.google}
			onReady={this.onMapReady}
			zoom={14}
			style={mapStyles}
			initialCenter={this.props.geodata ? this.props.geodata : defaultPlace}>
				{this.state.places && this.state.places.map(place => this.renderPlace(place))}

				<InfoWindow
					marker={this.state.activeMarker}
					onClose={this.onInfoWindowClose}
					visible={this.state.showingInfoWindow}>
					<div className='InfoWindow'>
						<div className='InfoWindow__pic'>
							<img src={this.state.selectedPlace.pic} alt=""/>
						</div>
						<div className='InfoWindow__text'>
							<h3>{this.state.selectedPlace.name}</h3>
							<span className='InfoWindow__rating'><Icon24Favorite /> {this.state.selectedPlace.rating}</span>
						</div>
					</div>
				</InfoWindow>
			</Map>

		);
	}
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_API_KEY'
})(MapContainer);