import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
    totalComments: 0,
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    const initialBackgroundClassNames =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]

    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLikes: false,
      initialClassName: initialBackgroundClassNames,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      totalComments: prevState.totalComments + 1,
    }))
  }

  setTotalComments = () => {
    this.setState(prevState => ({totalComments: prevState.totalComments - 1}))
  }

  changeLikeStatus = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLikes: !prevState.isLikes}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state

    const filteredCommments = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredCommments})
    this.setTotalComments()
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {name, comment, commentsList, totalComments} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="form-input-container">
            <img
              className="img"
              alt="comments"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="sub-heading">
                Say something about 4.0 Technologies
              </p>
              <input
                className="text-input"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
              />

              <textarea
                rows="6"
                value={comment}
                className="comment-description"
                placeholder="Your Comment"
                onChange={this.onChangeDescription}
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
          </div>
          <div>
            <hr className="hr-line" />
            <div className="all-comments-container">
              <input
                className="all-comments"
                id="all comments"
                type="button"
                value={totalComments}
              />
              <label className="comments" htmlFor="all comments">
                Comments
              </label>
            </div>
          </div>
          <ul className="comments-view-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                eachComment={eachComment}
                deleteComment={this.deleteComment}
                changeLikeStatus={this.changeLikeStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
