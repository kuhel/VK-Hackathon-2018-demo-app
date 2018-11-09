import React from 'react';
import PropTypes from 'prop-types';
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

export class MapContainer extends React.Component {
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
		const position = this.props.geodata ? this.props.geodata : defaultPlace;
		return (
			<Map
				google={this.props.google}
				onReady={this.onMapReady}
				zoom={14}
				style={mapStyles}
				initialCenter={position}
			>

				<Marker
					name='You are here'
					onClick={this.onMarkerClick}
					position={{ ...position }}
					icon='https://sun9-3.userapi.com/c816721/v816721296/3a/GnslKfyIKX0.png'
				/>
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
							{this.state.selectedPlace.rating && <span className='InfoWindow__rating'><Icon24Favorite /> {this.state.selectedPlace.rating}</span>}
						</div>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

MapContainer.propTypes = {
	geodata: PropTypes.shape({
		lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCkRQRctgbtGaGx0QRrXvxiijAd_1HLJ7U'
})(MapContainer);