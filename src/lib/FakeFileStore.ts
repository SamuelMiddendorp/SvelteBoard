import type { Board } from "./model";
import { v4 as uuidv4 } from 'uuid';

export const getBoard = () : Board => {
    return {
        id: uuidv4(),
        title: "First Board",
        description: "My first board",
        lanes: [{
            id: uuidv4(),
            title: "My first lane",
            items: [
                {id: uuidv4(), title: "foo11", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo22", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo33", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo44", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo55", description: "bar", prio: 1},
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