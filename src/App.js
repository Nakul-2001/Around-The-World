import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  // useNavigate,
  // withRouter,
  // Routers,
  // Redirect,
  Route,
  Routes,
  // Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  
  constructor (){
    super();
    this.state={
      category:'general',
      country:'in',
      query:'india',
      pageS:6,
      infinite:false,
      // apikey: process.env.REACT_APP_NEWS_API
      apikey: "bae9b8c2fd3d4224bede588eb22a7a72"
    }  
    this.changePgsize=this.changePgsize.bind(this);
    this.setProgress=this.setProgress.bind(this);//to resolve setState is not a function
  }
  //on changing category , already rendered component news , wouldn't re-render ,therefore using react router to switch between categories of news
  changeCategory=(event)=>{
    let c=event.target.innerHTML.toLowerCase();
    // console.log("clicked")
    this.setState({
      category:c
    })
    console.log(this.state.category+"changed");
  }
  // navigate = useNavigate();
  //the setState function is not working when using common function definition therefore using arrow function
  getquery=async(a)=>{  
    // let a=this.document.getElementById('search').value;  //can't access this way
    await this.setState({query:a});
    console.log(this.state.query);
    
  }
  
  async changePgsize(s){
    await this.setState({pageS:s, infinite:false});
    console.log(this.state.pageS);
  }
  state={
    progress:0
  }
  setProgress(progress){
    this.setState({progress:progress})  
  }
  infimode=()=>this.setState({infinite:true})
  render() {
    return (
      <div>
        <Router>
        <Navbar  changePgsize={this.changePgsize} getquery={this.getquery} infimode={this.infimode}/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
        {/* <News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key={this.state.category} pagesize={this.state.pageS} country={this.state.country} category={this.state.category} />  */} 
        {/* why this method is failing */}
        <Routes>
          <Route  path="/" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="" pagesize={this.state.pageS} country={this.state.country} category="general" /> } />
          <Route  path="/business" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="business" pagesize={this.state.pageS} country={this.state.country} category="business" /> } />
          <Route  path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="entertainment" pagesize={this.state.pageS} country={this.state.country} category="entertainment" /> } />
          <Route  path="/general" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="general" pagesize={this.state.pageS} country={this.state.country} category="general" /> } />
          <Route  path="/health" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="health" pagesize={this.state.pageS} country={this.state.country} category="health" /> } />
          <Route  path="/science" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="science" pagesize={this.state.pageS} country={this.state.country} category="science" /> } />
          <Route  path="/sports" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="sports" pagesize={this.state.pageS} country={this.state.country} category="sports" /> } />
          <Route  path="/technology" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key="technology" pagesize={this.state.pageS} country={this.state.country} category="technology" /> } />
          <Route  path="/search" element={<News setProgress={this.setProgress} apikey={this.state.apikey} infinite={this.state.infinite} key={this.state.query} query={this.state.query} pagesize={this.state.pageS} country={this.state.country} category="" /> } />
          {/* setting a variable key helps to re-render component , when search again in search page  */}
        </Routes>
        </Router>
      </div>
    )
  }
}
