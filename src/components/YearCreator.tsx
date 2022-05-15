import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Modal from "../components/UI/modal/Modal";

interface Event<T = EventTarget> {
  target: T;
}
type IYearCreator = {
  handleModal(): void;
};
interface IYearError {
  created: string;
  between: string;
}

const YearCreator: React.FC<IYearCreator> = ({ handleModal }) => {
  const { years, store } = React.useContext(Context);
  const [error, setError] = React.useState<IYearError>({} as IYearError);

  const errorHandler = () => {
    const alreadyCreated = years.Years.years.find(
      (year) => year.title === years.newYear
    );
    const find = years.allowedYears.find((year) => year === years.newYear);
    if (years?.newYear.length === 4 && alreadyCreated) {
      setError({ ...error, created: `This year has already been created ` });
    } else if (years?.newYear.length === 4 && !find) {
      setError({
        ...error,
        between: `Year value must be between ${years.start} and ${years.finish}`,
      });
    } else {
      setError({ ...error, created: ``, between: `` });
    }
  };

  const handleInput = (e: Event<HTMLInputElement>) => {
    years.setNewYear(e.target.value);
    errorHandler();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    years.createYear(store.token, store.isAdmin);
  };
  if (years.isLoading) {
    return (
      <div className="container">
        <div>...Laduę</div>
      </div>
    );
  }

  return (
    <Modal handleModal={handleModal}>
      <div className="item_creator">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            maxLength={4}
            minLength={4}
            value={years.newYear}
            onChange={handleInput}
          />
          <label className="label" htmlFor="floatingInput">
            Nowy dyskryptor
          </label>
        </div>
        <div style={{ color: "red" }}>
          <div>{error?.created ? error.created : null}</div>
          <div>{error?.between ? error.between : null}</div>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>
          Create new year
        </button>
        {years.newYearError && <div>{years.newYearError}</div>}
      </div>
    </Modal>
  );
};

export default observer(YearCreator);
