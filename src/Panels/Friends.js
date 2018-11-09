import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Panel, Group, List, ListItem, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Friends extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchedUser: null,
			geodata: null,
		};
	}
	componentDidMount() {
		this.props.getToken();
	}
	render() {
		const props = this.props;
		return (
			<Panel id={props.id}>
				<PanelHeader
					left={<HeaderButton onClick={props.go} data-to="home">
						{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
					</HeaderButton>}
				>
					Friends Screen
				</PanelHeader>
				<Group title="Friends List">
					<List>
						{props.friends && props.friends.map((friend) => 
							<ListItem
								key={friend.last_name}
								before={<Avatar src={friend.photo_100}/>}
								description={friend.city ? friend.city.title : ''}
							>
								{`${friend.first_name} ${friend.last_name}`}
							</ListItem>)}

					</List>
				</Group>
			</Panel>
		);
	}
}

Friends.propTypes = {
	id: PropTypes.string.isRequired,
	getToken: PropTypes.func.isRequired,
	go: PropTypes.func.isRequired,
};

export default Friends;
