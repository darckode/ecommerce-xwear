import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// const HatsPage = () => (
// 	<div>
// 		<h1>HATS PAGE</h1>
// 	</div>
// );

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		}
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if(userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					this.setState(
					{
						currentUser: {
							id: snapShot.id,
							...snapShot.data()
						}
					});

					console.log(this.state);
				});
			}
			this.setState({ currentUser: userAuth });
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser}/>
			    <Switch>
			    <Route exact={true} path='/' component={HomePage} />
			    <Route exact={true} path='/shop' component={ShopPage} />
			    <Route exact={true} path='/signin' component={SignInSignUpPage} />
			    </Switch>
			</div>
		);
	}
}

export default App;
