import React from 'react';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email: " ", 
            password: " "
             
        }
    }
    


    handleClick = () => {
        this.props.history.push('/register')
    }

    handleChange = () => {

        const headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
          });

        
        const init = {
            method: 'POST', 
            mode: 'corse',
            headers : headers, 
            body: new URLSearchParams(this.state)
        };

       

        fetch('http://localhost:8080/login', init, headers)
            .then(function(response){

            })
            .then(function(){

            });
    }

    render() {

        const {email, password, handleSubmit, handleChange} = this.props;


        return(
            <div className="Login">
                <h1>Login</h1>

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

                <button type="submit" onSubmit={handleSubmit}>Connexion</button>
                <h3 onClick={this.handleClick}>Don't have an account ?</h3>

            </div>

        );
    };
};

export default withRouter(Login);


