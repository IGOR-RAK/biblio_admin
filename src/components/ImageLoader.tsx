import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import no_image from "../images/NO_IMAGE.jpg";

interface Event<T = EventTarget> {
  target: T;
}

function ImageLoader() {
  const { cards, store } = React.useContext(Context);

  const onUpload = (e: Event<HTMLInputElement>) => {
    cards.handleUpload(e, store.isAdmin, store.token);
  };

  const onDestroyClick = () => {
    cards.handleDestroy(store.isAdmin, store.token);
  };

  return (
    <div className="img_loader">
      <input
        type="file"
        className="form-control"
        name="file"
        id="file_up"
        onChange={onUpload}
      />
      {cards.isImageLoading ? (
        <div className="spinner-border text-primary"></div>
      ) : (
        <div className="file_img mt-2">
          <img
            className="img"
            src={cards.initState.url ? cards.initState.url : no_image}
            alt="#"
          />
          {cards.initState.url ? (
            <span className="cross" onClick={onDestroyClick}>
              &#10060;
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default observer(ImageLoader);
