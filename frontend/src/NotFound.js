import React from 'react';
import {Button, Paper, Typography} from "material-ui";

const NotFound = (props) =>
	<div className="errorPage">
		<Paper elevation={4} className="errorTitle">
			<Typography type="headline"
									className="errorTitle"
									component="h1">
				404 page not found
			</Typography>
			<Typography component="p"
									className="errorTitle">
				We are sorry but the page you are looking for does not exist.
			</Typography>
			<br></br>
			<Button raised color="primary"
							className="errorButton"
							onClick={() => props.history.push('/')}>
				Back
			</Button>
		</Paper>
	</div>;

export default NotFound;