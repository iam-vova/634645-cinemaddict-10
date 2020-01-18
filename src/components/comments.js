import AbstractSmartComponent from "./abstract-smart-component";

const createCommentTemplate = (comments) => {
  const commentsTitle = `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>`;

  const commentsMarkup = comments.map((comment) => {
    const {id, emoji, message, userName, date} = comment;

    return (
      `<li class="film-details__comment" id="${id}">
        <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${message}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${userName}</span>
              <span class="film-details__comment-day">${date}</span>
              <button type="button" class="film-details__comment-delete">Delete</button>
            </p>
        </div>
      </li>`
    );
  }).join(``);

  const commentFormMorkup =
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
        <label class="film-details__emoji-label" for="emoji-gpuke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`;

  return `<section class="film-details__comments-wrap">
       ${commentsTitle}
       <ul class="film-details__comments-list">${commentsMarkup}</ul>
       ${commentFormMorkup}
    </section>`
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();

    this._comments = comments;
    this._submitFormHandler = null;
    this._emojiHandler = null;
    this._deleteHandler = null;
  }

  rerender() {
    super.rerender();
    this.recoveryListeners();
  }

  recoveryListeners() {
    this.setSubmitFormHandler(this._submitFormHandler);
    this.setEmojiHandler(this._emojiHandler);
    this.setDeleteHandler(this._deleteHandler);
  }

  getTemplate() {
    return createCommentTemplate(this._comments);
  }

  setSubmitFormHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, handler);

    this._submitFormHandler = handler;
  }

  setEmojiHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__emoji-label img`).forEach((emoji) => {
      emoji.addEventListener(`click`, handler);
    });

    this._emojiHandler = handler;
  }

  setDeleteHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((button) => {
      button.addEventListener(`click`, handler);

      this._deleteHandler = handler;
    });
  }
}

