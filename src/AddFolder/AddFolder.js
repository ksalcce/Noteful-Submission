import React from 'react';
import config from '../config';

//Imported Apicontext
import ApiContext from '../ApiContext'


class AddFolder extends React.Component {
    state = {
        name: {
            value: '',
            touched: false
        }
    }

    static contextType = ApiContext;

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name,folderid} = this.state;
        
    
        console.log(name);
        let options = {
            method: 'POST', 
            body: JSON.stringify({name: name.value }),
            headers: { 'Content-Type': 'application/json'}
        }
        fetch(`${config.API_ENDPOINT}/folder`, options) 
            .then(res => res.json())
            // .then(() => {
            //     this.context.addFolder({name: name.value})
            //     this.props.history.push(`/folder/${folderid}`)
            // })
            .then((respJson) => {
                this.context.addFolder({name: respJson.name, id: respJson.id})
                this.props.history.push(`/folder/${folderid}`)
            })
        
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } else if (name.length < 3) {
          return "Name must be at least 3 characters long";
        }
    }

    render() {
        
        return (
            <form className="registration" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <div className="addfolder__hint">* required field</div>  
                <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" className="name__control"
                    name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
                {this.state.name.touched}
                </div>
    
                <div className="addfolder__button__group">
                <button type="reset" className="addfolder__button">
                    Cancel
                </button>
                <button type="submit" className="addfolder__button" disabled={this.validateName()}>
                    Save
                </button>
                </div>
            </form>
        )
    }
}


export default AddFolder;