import Comments from "../components/comments";
import {remove, render, RenderPosition, replace} from "../utils/render";
import {generateDate} from "../utils/common";

export default class CommentsController {
  constructor(container, film) {
    this._container = container;
    this._film = film;
    this._onDataChange = this._onDataChange.bind(this);
    this._commentsComponent = null;
  }

  destroy() {
    remove(this._commentsComponent);
  }

  render(comments) {
    this._commentsComponent = new Comments(comments);

    this._commentsComponent.setSubmitFormHandler((evt) => {
      if (evt.keyCode === 13 && (evt.metaKey || evt.ctrlKey)) {
        const newData = {
          id: `${Date.now()}-${Math.random()}`,
          userName: `Admin`,
          date: generateDate(new Date()),
          message: evt.target.value,
          // TODO: emoji
          emoji: `no`
        };
        this._onDataChange(this, null, newData);
      }
    });

    this._commentsComponent.setDeleteHandler((evt) => {
      this._onDataChange(this, {id: evt.target.closest(`.film-details__comment`).id}, null);
    });

    this._commentsComponent.setEmojiHandler((evt) => {
      const emojiContainer = this._container.querySelector(`.film-details__add-emoji-label`);
      emojiContainer.innerHTML = ``;
      const bigEmoji = evt.target.cloneNode(false);
      bigEmoji.width = 55;
      bigEmoji.height = 55;
      emojiContainer.appendChild(bigEmoji);
    });

    render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
  }

  _onDataChange(movieController, oldData, newData) {
    this.destroy();
    if (oldData === null) {
      this._film.comments.unshift(newData);
    } else if (newData === null) {
      this._film.comments = this._film.comments.filter((comment) => comment.id !== oldData.id);
    }

    this.render(this._film.comments);
  }
}
