import React, {Component, PropTypes} from 'react';
import styles from '../styles/filter.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
export default class Filter extends Component {

  handleTab = tab => {

    const { topicId, unqueueIfNeeded } = this.props;
    const { router } = this.context;
 
    if(tab === 'new'){
      unqueueIfNeeded(topicId);
    }
 
    const path = '/' + tab + '/' + topicId;
    router.transitionTo(path);    
 
  }

  renderTab = (tab, tabName, last = false) => {

    const { order, topicId, queued } = this.props;

    return (
      <li styleName={ tab === order ? 'tab-active' : 'tab'}
        onClick={() => this.handleTab(tab)}>
          {tabName}
          <span styleName='queue'> 
            { queued > 0 && tab === 'new' ?
            this.props.queued : '' }
          </span>
      </li>
    );
  }

  render(){

    return (
      <ul styleName='bar'>
        {this.renderTab('new', 'New')}
        {this.renderTab('popular', 'Popular', true)}
      </ul>
    );
  }
}

//{this.renderTab('popular', 'Most Popular', true)}
Filter.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']),
  topicId: PropTypes.string.isRequired
};

Filter.contextTypes = {
  router: PropTypes.object.isRequired
};


