import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
    static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',

  }

    static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title= `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsPrime`;
  }

  async updateNews(pageNo){
    
  }
  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a767ba4844e440c8961a2cc1ce50a35b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  handlePreviourClick = async () => {
    await this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
    this.fetchNews();
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      await this.setState((prevState) => ({
        page: prevState.page + 1,
      }));
      this.fetchNews();
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center" style={{margin:'35px 0px',marginTop:'80px' }}>NewsPrime - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={(element.title || "").slice(0, 45)}
                  description={(element.description || "No description available").slice(0, 88)}
                  imageurl={element.urlToImage || "https://via.placeholder.com/150"}
                  newsurl={element.url} author={element.author || "Unknown"}
                  date={new Date(element.publishedAt).toGMTString() || "Unknown"}
                  source={element.source.name || "Unknown"}
                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviourClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

News.defaultProps = {
  country: "us",
  pageSize: 9,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
