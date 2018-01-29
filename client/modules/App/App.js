import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import { searchUser } from './AppActions';

const userStats =
  {
    displayName: 'StrongMachine',
    lastUpdated: '1513277270',
    rankings: [
      {
        rank: 'Gold II Division II',
        type: 'Ranked Duel 1v1',
        rating: '634',
        gamesPlayed: '123',
        topPercentile: '83',
        rankImage: 'gold-2',
      },
      {
        rank: 'Silver III Division I',
        type: 'Ranked Doubles 2v2',
        rating: '342',
        gamesPlayed: '43',
        topPercentile: '94',
        rankImage: 'silver-3',
      },
      {
        rank: 'Platinum I Division II',
        type: 'Ranked Standard 3v3',
        rating: '753',
        gamesPlayed: '352',
        topPercentile: '65',
        rankImage: 'platinum-1',
      },
    ],
    stats: {
      saves: '412',
      goals: '663',
      wins: '318',
    },
  };

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      userNotFound: false,
      searchMade: true,
      value: '',
    };
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  searchUser = () => {
    this.setState({ searchMade: true });
    this.props.dispatch(searchUser());
  };

  updateValue(text) {
    this.setState({ value: text.target.value });
  }

  renderNotFound() {
    return (
      <div className={styles.notFound}>
        User Not Found.
      </div>
    );
  }

  renderRankingStats(rankStats) {
    return (
      <div className={styles.rankedContainer}>
        <div className={styles.rankedType}>
          {rankStats.type}
        </div>
        <div className={styles.smContainer}>
          <div className={styles.rankedStat}>
            <span className={styles.stat}> {rankStats.gamesPlayed} </span>
            <span className={styles.label}> Games Played </span>
          </div>
          <div className={styles.rankedStat}>
            <span className={styles.stat}> {rankStats.topPercentile}% </span>
            <span className={styles.label}> Top Percentile </span>
          </div>
          <div className={styles.rankedStat}>
            <span className={styles.stat}> {rankStats.rating} </span>
            <span className={styles.label}> {rankStats.rank} </span>
          </div>
        </div>
      </div>
    );
  }

  renderUserStats() {
    // const { userStats } = this.props;
    return (
      <div>
        <div className={styles.userName}>
          {userStats.displayName}
        </div>
        <div className={styles.lastUpdated}>
          {userStats.lastUpdated}
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.stats}>
            <span className={styles.stat}> {userStats.stats.wins} </span>
            <span className={styles.title}> Wins </span>
          </div>
          <div className={styles.stats}>
            <span className={styles.stat}> {userStats.stats.goals} </span>
            <span className={styles.title}> Goals </span>
          </div>
          <div className={styles.stats}>
            <span className={styles.stat}> {userStats.stats.saves} </span>
            <span className={styles.title}> Saves </span>
          </div>
        </div>

        {userStats.rankings.map((rankStats) => this.renderRankingStats(rankStats))}
      </div>
    );
  }

  render() {
    const { userNotFound, searchMade } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.searchBarContainer}>
            <input onChange={this.updateValue} type="search" className={styles.searchBar} placeholder={'Look up user'} />
            <div className={styles.searchButton} onClick={() => console.log(this.state.value)}> Search </div>
          </div>
          <div className={styles.user}>
            {userNotFound && searchMade && this.renderNotFound()}
            {!userNotFound && searchMade && this.renderUserStats()}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  userStats: PropTypes.object,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    userStats: store.userStats,
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
