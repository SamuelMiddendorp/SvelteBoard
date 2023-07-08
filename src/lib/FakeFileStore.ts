import type { Board } from "./model";

export const getBoard = () : Board => {
    return {
        title: "First Board",
        description: "My first board",
        lanes: [{
            title: "My first lane",
            items: [
                {title: "foo", description: "bar", prio: 1},
                {title: "foo", description: "bar", prio: 1},
                {title: "foo", description: "bar", prio: 1},
                {title: "foo", description: "bar", prio: 1},
                {title: "foo", description: "bar", prio: 1},
            ]
        },
        {
            title: "My second lane",
            items: []
        },
    ],
    }
}