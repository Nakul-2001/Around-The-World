import React, { Component } from 'react'
import load from './load.gif'

export class Spinner extends Component {
  render() {
    return (
        this.props.loading &&<img src={load} alt="loading" style={{width:"70px" , display:"block",margin:"auto"}}/>
    )
  }
}

export default Spinner
