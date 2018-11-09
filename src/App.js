import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import Home from './Panels/Home';
import Friends from './Panels/Friends';
import { ROUTES } from './config';
import '@vkontakte/vkui/dist/vkui.css';

const location = window.location.hash.substr(1);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: ~ROUTES.indexOf(location) ? location : 'home',
			fetchedUser: null,
			geodata: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			if (e.detail.hasOwnProperty('type')) {
				switch (e.detail.type) {
					case 'VKWebAppGetUserInfoResult':
						this.setState({ fetchedUser: e.detail.data });
						break;
					case 'VKWebAppGeodataResult':
						this.setState({ 
							geodata: {
								lat: e.detail.data.lat,
								lng: e.detail.data.long
							}
						});
						break;
					case 'VKWebAppAccessTokenReceived':
						this.setState({
							token: e.detail.data.access_token
						});
						this.getFriends();
						break;
					case 'VKWebAppCallAPIMethodResult':
						debugger;
						if (e.detail.data.request_id === '34bc') {
							this.setState({ friends: e.detail.data.response.items });
						}
						break;
					default:
						break;
				}
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send('VKWebAppGetGeodata', {});
	}

	getToken = () => {
		connect.send("VKWebAppGetAuthToken", {"app_id": 6695435, "scope": "friends"});
	}

	getFriends() {
		connect.send("VKWebAppCallAPIMethod", {
			'method': "friends.get",
			'request_id': '34bc',
			'params': {
				'fields': 'city,domain,photo_100',
				'count': 25,
				'order': 'mobile',
				'access_token': this.state.token,
				'v': '5.87',
			}
		});
	}

	setLocation = (route) => {
		if (route !== 'home') {
			connect.send('VKWebAppSetLocation', { location: route });
		} else {
			connect.send('VKWebAppSetLocation', { location: '' });
		}
	}

	go = (e) => {
		const route = e.currentTarget.dataset.to;
		this.setState({ activePanel: route })
		this.setLocation(route)
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" user={this.state.fetchedUser} geodata={this.state.geodata}  go={this.go} />
				<Friends id="friends" data={this.state.data} friends={this.state.friends} getToken={this.getToken} token={this.state.token} go={this.go} />
			</View>
		);
	}
}

export default App;
