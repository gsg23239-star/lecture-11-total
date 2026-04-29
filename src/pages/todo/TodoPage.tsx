import { useState, useEffect, type SubmitEvent } from "react";
import styled from "styled-components";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

type Todo = {
    id: number;
    text: string;
    isCompleted: boolean;
};

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
`;

const InputSection = styled.form`
    display: flex;
    gap: 10px;
    background-color: ${props => props.theme.colors.background.paper};
    padding: 20px;
    border-radius: 16px;
    border: 1px solid ${props => props.theme.colors.divider};
`;

const StyledInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    font-size: 16px;
    outline: none;

    &:focus {
        border-color: ${props => props.theme.colors.primary};
    }
`;

const AddButton = styled.button`
    padding: 0 20px;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

const TodoList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TodoItem = styled.li<{ $isCompleted: boolean }>`
    background-color: ${props => props.theme.colors.background.paper};
    padding: 15px 20px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.2s ease;

    &:hover {
        border-color: ${props => props.theme.colors.primary}50;
    }

    span {
        flex: 1;
        font-size: 16px;
        color: ${props =>
            props.$isCompleted
                ? props.theme.colors.text.disabled
                : props.theme.colors.text.default};
        text-decoration: ${props => (props.$isCompleted ? "line-through" : "none")};
    }
`;

const IconButton = styled.button<{ $colorType: "check" | "delete" }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: ${props =>
        props.$colorType === "check" ? props.theme.colors.success : props.theme.colors.error};
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue,
            isCompleted: false,
        };

        setTodos(prev => [...prev, newTodo]);
        setInputValue("");
    };

    const toggleTodo = (id: number) => {
        setTodos(prev =>
            prev.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)),
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    return (
        <Container>
            <Title>Todo List</Title>

            <InputSection onSubmit={handleAddTodo}>
                <StyledInput
                    type="text"
                    placeholder="오늘의 할 일을 입력하세요"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <AddButton type="submit">
                    <FaPlus />
                </AddButton>
            </InputSection>

            <TodoList>
                {todos.map(todo => (
                    <TodoItem key={todo.id} $isCompleted={todo.isCompleted}>
                        <IconButton $colorType="check" onClick={() => toggleTodo(todo.id)}>
                            <FaCheck />
                        </IconButton>
                        <span>{todo.text}</span>
                        <IconButton $colorType="delete" onClick={() => deleteTodo(todo.id)}>
                            <FaTrash />
                        </IconButton>
                    </TodoItem>
                ))}
            </TodoList>
        </Container>
    );
}

export default TodoPage;
