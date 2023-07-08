import type { Board } from "./model";

export const getBoard = () : Board => {
    return {
        title: "First Board",
        description: "My first board",
        lanes: [{
            title: "My first lane",
            items: []
        },
        {
            title: "My second lane",
            items: []
        },
    ],
    }
}