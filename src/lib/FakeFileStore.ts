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
                {id: uuidv4(), title: "foo", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo", description: "bar", prio: 1},
                {id: uuidv4(), title: "foo", description: "bar", prio: 1},
            ]
        },
        {
            id: uuidv4(),
            title: "My second lane",
            items: []
        },
    ],
    }
}