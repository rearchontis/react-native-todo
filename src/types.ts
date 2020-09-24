export type _todoReducer = (state: TodoState, action: TodoAction) => TodoState;
export type _screenReducer = (
  state: ScreenState,
  action: ScreenAction
) => ScreenState;

export type ScreenState = string;

export interface Todo {
  id: string;
  title: string;
}

export interface TodoState {
  todos: Todo[];
}

export interface ScreenContextValues {
  changeScreen: (id: string) => void;
  todoId: string;
}

export interface ScreenAction {
  type: string;
  payload: string;
}

export interface TodoContextValues {
  todos: Todo[];
  addTodo?: (title: string) => void;
  updateTodo?: (title: string, id: string) => void;
  removeTodo?: (id: string) => void;
}

export interface TodoAction {
  type: string;
  title?: string;
  id?: string;
}

export interface AddTodoProps {
  onSubmit?: (title: string) => void;
}

export interface EditModalProps {
  value: string;
  visible: boolean;
  onCancel: () => void;
  onSaveHandler: (editedTitle: string) => void;
}

export interface NavbarProps {
  title: string;
}

export interface TodoComponentProps {
  todo: Todo;
  onRemove?: (id: string) => void;
  onOpen: (id: string) => void;
}

export interface AppButtonProps {
  style?: Record<string, string | number>;
  onPress: (...args: any[]) => any;
}

export interface AppTextProps {
  type?: "neucha" | "cabin-sketch-regular" | "cabin-sketch-bold";
  style?: Record<string, string | number>;
}
