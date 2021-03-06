import React, { Component } from 'react';
import axios from 'axios';
import Todos from '../components/Todos';
import Biocard from '../components/Biocard';
import { Container, Row, Col } from 'react-grid-system';

class Dashboard extends Component {
	state = {
		redirect: false,
		todos: [],
		title: '',
		description: '',
		dueDate: '',
	};

	componentDidMount() {
		axios
			.get('/api/user')
			.then((res) => this.setState({ todos: res.data.todos }));
	}

	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value,
		});

	onSubmit = (e) => {
		const newTodo = {
			title: this.state.title,
			description: this.state.description,
			dueDate: this.state.dueDate,
		};

		axios.post('/api/trollos', newTodo).then((res) => {
			this.setState({ title: '', description: '', dueDate: '' });
		});
	};

	toggleComplete = (_id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo._id === _id) {
					todo.completed = !todo.completed;
				}
				return todo;
			}),
		});
	};

	render() {
		return (
			<div className='Dashboard'>
				<br></br>
				<Container>
					<Row>
						<Col md={4}>
							<Biocard />
						</Col>

						<Col md={8}>
							<div>
								<div className='ui middle aligned center aligned grid'>
									<div className='column'>
										<form className='ui large form' onSubmit={this.onSubmit}>
											<div className='ui stacked secondary segment'>
												<div className='content'></div>
												<div className='field'>
													<div className='ui left icon input'>
														<i className='edit outline icon'></i>
														<input
															type='text'
															name='title'
															placeholder='Item Title'
															value={this.state.title}
															onChange={this.onChange}
														/>
													</div>
												</div>
												<div className='field'>
													<div className='ui left icon input'>
														<i className='edit outline icon'></i>
														<input
															type='text'
															name='description'
															placeholder='Enter Description'
															value={this.state.description}
															onChange={this.onChange}
														/>
													</div>
												</div>
												<div className='field'>
													<div className='ui left icon input'>
														<i className='calendar alternate outline icon'></i>
														<input
															type='date'
															name='dueDate'
															placeholder='Enter Date'
															value={this.state.dueDate}
															onChange={this.onChange}
														/>
													</div>
												</div>
												<input
													type='submit'
													className='ui fluid large olive button'
												/>
											</div>
										</form>
									</div>
								</div>
							</div>
						</Col>
					</Row>

					<br></br>
					<br></br>
					<Row>
						<Col md={12}>
							<Todos
								todos={this.state.todos}
								toggleComplete={this.toggleComplete}
								deleteTodo={this.deleteTodo}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Dashboard;
