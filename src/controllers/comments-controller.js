import Comments from "../components/comments";
import {remove, render, RenderPosition} from "../utils/render";
import {generateDate} from "../utils/common";

export default class CommentsController {
  constructor(container, film) {
    this._container = container;
    this._film = film;
    this._onDataChange = this._onDataChange.bind(this);
    this._commentsComponent = null;
    this._emoji = null;
  }

  destroy() {
    remove(this._commentsComponent);
  }

  render(comments) {
    this._commentsComponent = new Comments(comments);

    this._commentsComponent.setSubmitFormHandler((evt) => {
      if (this._emoji !== null && evt.target.value !== ``) {
        if (evt.keyCode === 13 && (evt.metaKey || evt.ctrlKey)) {
          const newData = {
            id: `${Date.now()}-${Math.random()}`,
            userName: `Admin`,
            date: generateDate(new Date()),
            message: evt.target.value,
            emoji: this._emoji.src.substring(this._emoji.src.lastIndexOf(`/`) + 1),
          };
          this._onDataChange(this, null, newData);
        }
      }
    });

    this._commentsComponent.setDeleteHandler((evt) => {
      this._onDataChange(this, {id: evt.target.closest(`.film-details__comment`).id}, null);
    });

    this._commentsComponent.setEmojiHandler((evt) => {
      const emojiContainer = this._container.querySelector(`.film-details__add-emoji-label`);
      emojiContainer.innerHTML = ``;
      this._emoji = evt.target.cloneNode(false);
      this._emoji.width = 55;
      this._emoji.height = 55;
      emojiContainer.appendChild(this._emoji);
    });

    render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
  }

  _onDataChange(movieController, oldData, newData) {
    this.destroy();
    this._emoji = null;
    if (oldData === null) {
      this._film.comments.unshift(newData);
    } else if (newData === null) {
      this._film.comments = this._film.comments.filter((comment) => comment.id !== oldData.id);
    }

    this.render(this._film.comments);
  }
}
