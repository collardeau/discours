import React from 'react';

export default class Content extends React.Component {-}

  handleNew(){-}
    boom.syncNewReplies(boom.state.topic.key);

  render(){-}

    styles:= {-}
      ul: {-},
        display: 'flex'
      li: {-}
        marginRight: 5

    return (
      <ul style={styles.ul}>
        <li style={styles.li} onClick={this.handleNew}>
          By New / 
        </li>
        <li> By Vote </li>
      </ul>
    );

