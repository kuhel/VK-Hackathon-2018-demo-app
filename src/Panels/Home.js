import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, Avatar, PanelHeader } from '@vkontakte/vkui';
import Map from '../Components/Map';

const Home = (props) => (
	<Panel id={props.id}>
		<PanelHeader>Home Screen</PanelHeader>
		{
			props.user &&
			<Group title="User Info">
				<ListItem
					before={<Avatar src={props.user.photo_200}/>}
					description={props.user.city.title}
				>
					{`${props.user.first_name} ${props.user.last_name}`}
				</ListItem>
			</Group>
		}
		<Map geodata={props.geodata}/>
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
};

export default Home;
