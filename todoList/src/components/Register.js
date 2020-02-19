import React from 'react';

class Register extends React.Component {

     constructor(props) {
        super(props)
    
        this.state = {
             name: " ", 
             email: " ", 
             passwword: " " 
        }
    }

    render() {

        const {name, email, password, handleSubmit, handleChange} = this.props;

        return(
            <div className="Register"> 
                <h1>Register</h1>

                
                <label for="name">Name</label> 

                <input type="text" placeholder="Enter Email" name="email" 
                    onChange={handleChange} 
                    value={name} 
                    required 
                />

                <label for="email">Email</label>

                <input type="text" placeholder="Enter Email" name="email" 
                    onChange={handleChange} 
                    value={email} 
                    required 
                />

                <label for="password">Password</label>

                <input type="password" placeholder="Enter Password" name="password" 
                    onChange={handleChange} 
                    value={password} 
                    required 
                /> 

                <button type="submit" onSubmit={handleSubmit}>Inscription</button>

            </div>

        );
    };
};

export default (Register);