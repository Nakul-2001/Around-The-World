import React, { Component } from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import { useNavigation } from '@react-navigation/native';

export class Navbar extends Component {
  constructor (){
    super();
    this.state={
      query:''
    }  
    this.handleChange=this.handleChange.bind(this); //without binding handle change is unable to use setstate
  }
  handleSubmit(event){
    // 👇️ prevent page refresh
    event.preventDefault();
    // console.log('form submitted ✅');
  };
  handleChange(event) {
    // console.log(event.target.value)
    this.setState({query: event.target.value,e:event});
    console.log(this.state.query);
    // this.props.getquery(this.state.query)  //dont do this-onchange searching
  }
  search=(event)=>{this.state.e.target.value="";  //to empty input box on submit click
   console.log(event);  this.props.getquery(this.state.query)}
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg bg-info" style={{height:'3.5rem'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Prime News</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{display:'flex',justifyContent:'space-around',alignItem:'center'}}>
                <ul className="navbar-nav me-auto mb-3 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" target={'_blank'} href="https://github.com/singh-sambhav" data-bs-toggle="tooltip" data-bs-placement="top" title="About Author" >About us</a>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/business"  >Business</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="entertainment"  >Entertainment</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="general"  >General</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="health"  >Health</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="science"  >Science</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="sports"  >Sports</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="technology"  >Technology</Link>
                    </li>

                    <div className="btn-group mx-3" style={{margin:'0rem 1rem'}}>
                      <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{border:'2px solid aquamarine',color:'antiquewhite',height:'3rem',marginTop:'0.3rem'}}>
                        News per page
                      </button>
                      <ul className="dropdown-menu" style={{cursor:'pointer'}}>
                        <li><a  className="dropdown-item" onClick={()=>{this.props.changePgsize(5)}}>5 news</a></li>
                        <li><a className="dropdown-item" onClick={()=>{this.props.changePgsize(10)}}>10 news</a></li>
                        <li><a className="dropdown-item" onClick={()=>{this.props.changePgsize(20)}}>20 news</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" onClick={this.props.infimode} data-bs-toggle="tooltip" data-bs-placement="top" title="Infinit Scroll">
                          All news</a></li>
                      </ul>
                    </div>
                    <form onSubmit={this.handleSubmit} className="mx-4 d-flex" role="search">
                      <input id='search' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name='search' onChange={this.handleChange} style={{height:'3rem',
                      width:'7rem',marginTop:'0.3rem'}} onKeyUp={(e)=>(e.key==='Enter')?this.handleChange(e):''}/>
                      <Link style={{border:'2px solid aquamarine',color:'aliceblue',fontFamily:'cursive',height:'3rem',marginTop:'0.3rem'}} className="btn btn-outline-success" to="search"  onClick={this.search}>Search</Link>
                      {/* navigated by Link,to , and value pass by storing in a state  */}
                    </form>
                    
                </ul>
                
                </div>
            </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
