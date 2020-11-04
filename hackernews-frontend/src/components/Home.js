import React, { Component } from 'react'

export default class Home extends Component {
  state = {
    links: []
  }

  componentDidMount() {
    let query = `
      query {
        links {
          id
          description
          url
        }
      }
    `

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
    }

    fetch("http://localhost:8000/graphql/", options)
      .then((response) => response.json())
      .then((links) => {
        console.log(links)
        links.data.links.forEach((link) => {
          this.setState({
            links: [...this.state.links, link]
          })
        })
      })
      .catch(console.error())
  }

  renderLinks() {
    return this.state.links.map((link) => {
      return <li
        key={link.id}>
        <a href={link.url}>{link.description}</a>
        <button onClick={() => this.deleteLink(link.id)}>X</button>
      </li>
    })
  }

  // deleteLink(linkId) {
  //   let deleteQuery = `
  //     mutation {
  //       deleteLink(id: ${linkId}) {
  //         id
  //         description
  //         url
  //       }
  //     }
  //   `

  //   let options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ query: deleteQuery })
  //   }

  //   fetch("http://localhost:8000/graphql/", options)
  //     .then((response) => response.json())
  //     .then((link) => { console.log(link) })
  //     .catch(console.error())
  // }

  render() {
    return (
      <div>
        <h1>
          Hackner News
      </h1>
        <h2>
          News about Hackner
      </h2>
        <ul>
          {this.renderLinks()}
        </ul>
      </div>
    )
  }
}
