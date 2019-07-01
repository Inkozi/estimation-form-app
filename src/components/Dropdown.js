import React, { Component }  from 'react'
import onClickOutside from "react-onclickoutside";
import FontAwesome from 'react-fontawesome'
import '../styles/global.css'

class Dropdown extends Component{
	constructor(props){
		super(props);
		this.state = {
			listOpen: false,
			headerTitle: this.props.title
		}
		this.close = this.close.bind(this) //TODO
	}

	/*
	 *	fxn : handleClickOutside
	 *		sets state to close when cursor clicks outside
	 *
	 */
	handleClickOutside(evt){
		this.setState({
			listOpen: false
		})
	}

	/*
	 *	fxn :: toggleList
	 *		sets state when the list is toggled
	 *
	 */
	toggleList(){
		this.setState(prevState => ({
			listOpen: !prevState.listOpen
		}))
	}

	/*
	 *	fxn : selectItem
	 *		@param title : <string>
	 *		@param id : <int>
	 *		@param stateKey: <string>
	 *
	 *
	 */
	selectItem(title, id, stateKey){
		console.log("is this selecting");
		this.setState({
			headerTitle: title,
			listOpen: false
		}, 
		this.props.resetThenSet(id, stateKey))
	}

	/*
	 * 	fxn : close()
	 *		closes the list
	 *	
	 */
	close(){
		this.setState({
			listOpen: false
		})
	}

	render(){
		//aliases
		const{list} = this.props;
		const {listOpen, headerTitle} = this.state;

		//renders dropdown component
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
							<li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected}</li>
							))}
						</ul>}
					</div>
				)
	}
}


export default onClickOutside(Dropdown);



