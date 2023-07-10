import React, { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import equal from "fast-deep-equal";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
export class News extends Component {
  articles = [];

  static defaultProps = {
    country: "in",
    pagesize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    //set the component , every time an object of this class invokes
    super();
    this.state = {
      //state is the variable used to continuously changing variables
      articles: this.articles,
      loading: true,
      pgno: 1,
      totalResults:0,
    }

  }
  componentDidUpdate(prevProps) {
    //for re-rendering on pagesize change
    if (!equal(this.props.pagesize, prevProps.pagesize)) {
      this.updateNews();
    }
  }
  async updateNews() {
    // console.log("updating");
    this.props.setProgress(10);
    let url;
    if (this.props.category === "") {
      //when there is query
      url = `https://news-ride-api.vercel.app/api?q=${this.props.query}&apiKey=${this.props.apikey}&page=${this.state.pgno}&pageSize=${this.props.pagesize}`;
    } else {
      //when there is category
      url = `https://news-ride-api.vercel.app/api?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pgno}&pageSize=${this.props.pagesize}`;
    }
    this.props.setProgress(20);
    // console.log(this.state.pgno+"aftercall")
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(50);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pagesize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData=await data.json();
    // // console.log(parsedData);
    // this.setState({
    //     articles:parsedData.articles , totalResults:parsedData.totalResults,
    //     loading:false
    //  });
  }
  //function in a class component should be always a arrow function- not necessary
  nextpg = async () => {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pgno+1}&pageSize=${this.props.pagesize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData=await data.json();
    // // console.log(parsedData);
    // this.setState({
    //     articles:parsedData.articles,
    //     pgno:this.state.pgno+1,
    //     loading:false
    // });
    await this.setState({ pgno: this.state.pgno + 1 }); //this was creating problem when updated earlier
    this.updateNews();
  };
  prevpg = async () => {
    // console.log("prev");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pgno-1}&pageSize=${this.props.pagesize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData=await data.json();
    // // console.log(parsedData);
    // this.setState({
    //     articles:parsedData.articles,
    //     pgno:this.state.pgno-1,
    //     loading:false
    // });
    await this.setState({ pgno: this.state.pgno - 1 });
    this.updateNews();
  };
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchMoreData = async() => {
    await this.setState({pgno:this.state.pgno+1,loading:true})
    let url;
    if (this.props.category === "") {
      //when there is query
      url = `https://news-ride-api.vercel.app/api?q=${this.props.query}&apiKey=${this.props.apikey}&page=${this.state.pgno}&pageSize=${this.props.pagesize}`;
    } 
    else {
      //when there is category
      url = `https://news-ride-api.vercel.app/api?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pgno}&pageSize=${this.props.pagesize}`;
    }
    // console.log(this.state.pgno+"aftercall")
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    await this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false
    });
  };

  render() {
    return (
      <div>
        <div className="container my-3 ">

          <h1 className="text-center" style={{marginTop:'80px',marginBottom:'20px'}}>
            Top Headings -
            {this.capitalize(
              this.props.category !== "" ? this.props.category : this.props.query
            )}
          </h1>

            <Spinner loading={this.state.loading}/> 
            {/* image is imported as a component  */}

             <div className="row " style={{display:this.props.infinite?"none":"flex"}}>
              {this.state.loading === false &&
                this.state.articles.map((element) => {
                    return (
                        <div key={element.url} className="col-md-4">
                        <NewsItems
                        tittle={element.title}
                        description={element.description}
                        imageUrl={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                        />
                        </div>
                        );
                    })}
                </div> 

                {this.props.infinite===false && <div className="bottom d-flex justify-content-between my-3 ">
                    <button
                    disabled={this.state.pgno <= 1}
                    type="button"
                    className="btn btn-info"
                    onClick={this.prevpg}
                    >
                    &larr; Previous
                    </button>
                    <button
                    disabled={
                        this.state.pgno + 1 >
                        Math.ceil(this.state.totalResults / this.props.pagesize)
                    }
                    type="button"
                    className="btn btn-info"
                    onClick={this.nextpg}
                    >
                    Next &rarr;
                    </button>
                </div> }
            
       {this.props.infinite &&  <div className="container ">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
                    <div className="row">
                {/* {this.state.loading===true && <Spinner />} */}
                {
                    this.state.articles.map((element) => {
                    return (
                        <div key={element.url} className="col-md-4">
                        <NewsItems
                            tittle={element.title}
                            description={element.description}
                            imageUrl={element.urlToImage}
                            url={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source.name}
                        />
                        </div>
                    );
                    })}
                    </div>
            </div>
          </InfiniteScroll>
          </div>}

        </div>
      </div>
    );
  }
}

export default News;
