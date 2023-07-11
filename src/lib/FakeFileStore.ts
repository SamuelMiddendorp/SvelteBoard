import type { Board } from "./model";
import { v4 as uuidv4 } from 'uuid';

export const getBoard = async (): Promise<Board> => {

    let board = await getSavedBoard();
    // Very bad check to see if we actually found a board
    if ("id" in board) {
        return board;
    }
    // If no board is present use a default one 
    return {
        id: uuidv4(),
        title: "First Board",
        description: "My first board",
        lanes: [{
            id: uuidv4(),
            title: "My first lane",
            items: [
                { id: uuidv4(), title: "foo11", description: "bar", prio: 1 },
                { id: uuidv4(), title: "foo22", description: "bar", prio: 1 },
                { id: uuidv4(), title: "foo33", description: "bar", prio: 1 },
                { id: uuidv4(), title: "foo44", description: "bar", prio: 1 },
                { id: uuidv4(), title: "foo55", description: "bar", prio: 1 },
            ]
        },
        {
            id: uuidv4(),
            title: "My second lane",
            items: []
        },
        {
            id: uuidv4(),
            title: "My third lane",
            items: []
        },
        ],
    }
}
const getSavedBoard = async (): Promise<Board> => {
    let res = await fetch('/api/board', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}