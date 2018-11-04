import React from 'react';
import { KeyboardArrowUp, KeyboardArrowDown} from 'material-ui-icons';


const VoteComponent = (props) => {
	return (
		<div className='voteArea'>
			<div className='arrow-up'>
				<KeyboardArrowUp onClick={props.voteComment}
								className='voteCursor'
								id='upVote'/>
			</div>
			<div className='voteScore'>
				{props.voteScore}
			</div>
			<div className='arrow-down'>
				<KeyboardArrowDown onClick={props.voteComment}
									className='voteCursor'
									id='downVote'/>
			</div>
		</div>
	)
};

export default VoteComponent;