import {formatDistanceToNow} from 'date-fns'
import './index.css'

const like =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
const liked =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

const ComponentItem = props => {
  const {
    eachComment,

    deleteComment,
    changeLikeStatus,
  } = props

  const {name, comment, isLikes, date, initialClassName} = eachComment

  const onDeleteComment = () => {
    deleteComment(eachComment.id)
  }

  const isLikesComment = () => {
    changeLikeStatus(eachComment.id)
  }

  const postedTime = formatDistanceToNow(date)

  const initials = name[0].toUpperCase()

  const likeImageUrl = isLikes ? liked : like
  const likedClassName = isLikes ? 'like-status liked-color' : 'like-status'

  return (
    <li className="comment-item-container">
      <div className="initial-comment">
        <div className={`initial-bg ${initialClassName}`}>
          <p className="initial">{initials}</p>
        </div>
        <div className="name-comment">
          <div className="name-time">
            <p className="name">{name}</p>
            <p className="posted-time">{postedTime}</p>
          </div>

          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete">
        <div className="like-container">
          <img className="like-img" alt="like" src={likeImageUrl} />
          <button
            type="button"
            className={likedClassName}
            onClick={isLikesComment}
          >
            Like
          </button>
        </div>

        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={onDeleteComment}
        >
          <img
            className="delete-icon"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
      <hr className="horizon-line" />
    </li>
  )
}

export default ComponentItem
