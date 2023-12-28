import { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { deleteTodo } from '../api/todos';
import { useSelector } from '../providers/TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const { updateTodos } = useSelector();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // TODO
  };

  const handleStartEditing = () => {
    setIsEditMode(true);
    inputRef.current?.focus();
  };

  const handleToggleCheckbox = () => {
    // TODO
  };

  const handleDelete = () => {
    setIsLoading(true);

    deleteTodo(id)
      .then(updateTodos)
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleCheckbox}
        />
      </label>

      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            ref={inputRef}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setIsEditMode(false)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleStartEditing}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>

  );
};
