import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {searching: false, repo: ''};
  }

  searchPressed() {
    this.setState({searching: true});
    this.props.fetchGitIssues(this.state.repo).then(()=>{
      this.setState({searching: false});
    });
  }

  gitIssues() {
    return Object.keys(this.props.searchedIssues).map( (key) => this.props.searchedIssues[key]);
  }

  render() {
    return <View style={styles.scene}>
      <View style={styles.searchSection}>
        <TextInput style={styles.searchInput}
          returnKeyType='search'
          placeholder='Type org/repo_name'
          onChangeText={(repo) => this.setState({repo}) }
          value={this.state.repo}
        />
        <TouchableHighlight onPress={ () => this.searchPressed() } style={styles.searchButton}>
          <Text>Fetch Issues</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.scrollSection}>
        { (!this.state.searching && this.gitIssues().length == 0) ? <Text>Invalid Repository</Text> :
         (! this.state.searching && 
          this.gitIssues().map((issue) => {
          
          return <View key={issue.id} style={styles.card}>
            <Text style={styles.title}>{issue.title}</Text>
          </View>
          }))
        }
        { this.state.searching ? <Text>Fetching...</Text>: null }
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
      marginTop: 20,
  },
  searchSection: {
    height: 40,
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      padding: 5,
      flexDirection: 'row'
  },
  searchInput: {
    flex: 0.6,
    height: 40 
  
  },
  searchButton: {
    flex: 0.4,
    justifyContent: 'flex-end'
  },
  scrollSection: {
    flex: 0.8
  },
  title: {
    color: '#000',
    height: 20
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    padding: 5
  }

});

function mapStateToProps(state) {
  return {
    searchedIssues: state.searchedIssues
  };
}

export default connect(mapStateToProps)(Home);
