"use-strict";

import React from 'react';

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: "",
            tasks: []
        };

        // vos bind etc...
        this.toggleChange = this.toggleChange.bind(this);
    }

    toggleChange(event) {
        
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.inputValue} onChange={this.toggleChange}/>
                <button type="button" onClick={this.addTask}>Add task</button>
                {
                    this.state.tasks.map((task, index) => {
                        return (
                            <p>{task}</p>
                        )
                    })
                }
            </div>
        );
    }
}

export default List;
