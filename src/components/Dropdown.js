import React, { Component }  from 'react'
import FontAwesome from 'react-fontawesome'
import '../styles/global.css'

class Dropdown extends Component{
	constructor(props){
		super(props)
		this.state = {
			listOpen: false,
			headerTitle: this.props.title
		}
		this.close = this.close.bind(this)
	}

	toggleList(){
		this.setState(prevState => ({
			listOpen: !prevState.listOpen
		}))
	}

	close(){
		this.setState({
			listOpen: false
		})
	}

	render(){
		//aliases
		const{list} = this.props;
		const {listOpen, headerTitle} = this.state;

		//render fxn
		return(
			<div className="dd-wrapper">
				<div className="dd-header" onClick={() => this.toggleList()}>
					<div className="dd-header-title">{headerTitle}</div>
					{listOpen
						? <FontAwesome name="angle-up" size="5x"/>
						: <FontAwesome name="angle-down" size="5x"/>
					}
					</div>
					{listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
						{list.map((item) => (
							<li className="dd-list-item" key={item.id}> {item.title}</li>
							))}
						</ul>}
					</div>
				)
	}
}


export default Dropdown



