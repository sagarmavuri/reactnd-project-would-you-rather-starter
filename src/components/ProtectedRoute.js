import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

/**
 * ...rest - gets you the remaining props other than the 'component' prop
 * reference from  https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (
				rest.authedUser && rest.authedUser !== null
					? 	<Component {...props} />
					: 	<Redirect to={{
							 pathname: '/',
							 state: { from:  props.location }
						}} />
			)}
		/>
	)
}

function mapSateToProps({ authedUser }) {
	return {
		authedUser,
	}
}

export default connect(mapSateToProps)(ProtectedRoute)