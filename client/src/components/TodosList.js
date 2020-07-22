import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Button } from 'react-bootstrap';

export class TodosList extends Component {
	componentDidMount = (props) => {
		console.log(this.props.todo);
	};

	render() {
		const { title, description, dueDate } = this.props.todo;
		return (
			<div className='container mt-2'>
				<Accordion style={{ width: '400px' }}>
					<Card>
						<Card.Header>
							<Accordion.Toggle
								as={Button}
								variant='link'
								eventKey='0'
								style={{ color: 'black' }}
							>
								<div className='font-weight-bolder'>{title}</div>
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<div
									className='font-weight-bold'
									style={{
										textDecoration: this.props.todo.complete
											? 'line-through'
											: '',
									}}
								>
									{description}
									<br></br>
									Due Date: {dueDate}
								</div>
								<div>
									<Button
										onClick={this.props.toggleComplete.bind(this, description)}
										className='ui large olive button'
									>
										<i class='check icon'></i>
									</Button>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
		);
	}
}
TodosList.protoTypes = {
	todo: PropTypes.object.isRequired,
	toggleComplete: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
};

export default TodosList;
