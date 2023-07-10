import React, { Component } from 'react'



export class NewsItems extends Component {

    render() {
        let {tittle,description,imageUrl,url,author,date,source} = this.props; //destructuring of props
        return (
      <div className='newsitem' style={{ webkitBoxShadow: '0px 0px 10px -10px rgba(0, 0, 0, 0.75)',
          boxShadow: '0px 0px 25px -10px rgba(0, 0, 0, 0.75)'
      }}>
            <div className="card my-1" >
              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:"10%"}}>
      {source}
      <span className="visually-hidden">unread messages</span>
    </span>

                <img src={imageUrl?imageUrl:"https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{tittle}</h5>
                    <p className="card-text">{description}...</p>
                    <a href={url} target="_blank" className="btn btn-sm btn-info">Read More</a>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} - {new Date(date).toGMTString()}</small></p>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItems
