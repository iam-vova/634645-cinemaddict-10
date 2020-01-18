import Comments from "../components/comments";
import {render, RenderPosition, replace} from "../utils/render";
import {generateDate} from "../utils/common";

export default class CommentsController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._commentsComponent = null;
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
        this._commentsComponent.rerender();
      }
    });

    this._commentsComponent.setDeleteHandler((evt) => {
      this._onDataChange(this, {id: evt.target.closest(`.film-details__comment`).id}, null);
      this._commentsComponent.rerender();
    });

    render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
  }
}
