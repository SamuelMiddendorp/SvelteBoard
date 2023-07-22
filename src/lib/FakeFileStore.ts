import type { Board } from "./model";
import { v4 as uuidv4 } from 'uuid';

export const getBoard = () : Board => {

    let board = getSavedBoard();
    // Very bad check to see if we actually found a board
    if(board != null){
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

export const setBoard = (board: Board) => {
    localStorage.setItem("svelteboard-board", JSON.stringify(board));
}

const getSavedBoard = () : Board => {
    return JSON.parse(localStorage.getItem("svelteboard-board")!);
}