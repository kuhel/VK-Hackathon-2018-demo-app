import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, Avatar, PanelHeader, Button, Div } from '@vkontakte/vkui';
import Map from '../Components/Map';
import './Home.css';

const Home = (props) => (
	<Panel id={props.id}>
		<PanelHeader>Maps of Museums Nearby</PanelHeader>

		<Div className='map'>
			<h2>Map of museums near your location</h2>
			<Map geodata={props.geodata}/>
		</Div>

		{
			props.user &&
			<Group title="User Info">
				<ListItem
					before={<Avatar src={props.user.photo_100}/>}
					description={props.user.city && props.user.city.title}
				>
					{`${props.user.first_name} ${props.user.last_name}`}
				</ListItem>
			</Group>
		}

		<Group>
			<ListItem>
				<Button size='l' stretched onClick={props.go} data-to='friends'>Friends list</Button>
			</ListItem>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
	geodata: PropTypes.shape({
		lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	go: PropTypes.func.isRequired,
};

export default Home;
