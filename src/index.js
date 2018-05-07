import  _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/Video_detail';

const API_KEY = 'AIzaSyAHmU-0zTfNgM0LjJcKXJWiuzBHT2nMbXk';

// Create a new component. This component should produce some HTML

class App extends Component {
	constructor(props){
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null 
		};

		this.videoSearch('tech');	
	}

	videoSearch(term){

		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos, //pass the list of videos 
				selectedVideo: videos[0]  // assing the first video to selectedVideo
			});
			//this.setState({ videos: videos });
		});
	}

	render(){

		const videoSearch = _.debounce((term) => {this.videoSeach(term)}, 300);

		return (
		<div>
			<SearchBar  onSearchTermChange={videoSearch} />
			<VideoDetail video={this.state.selectedVideo} />
			<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
				videos={this.state.videos} 
			/>
		</div>
		);
	}
}

//Take components generated HTML and put it
//on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));
