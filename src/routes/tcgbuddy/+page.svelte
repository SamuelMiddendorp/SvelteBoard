<script lang="ts">
    import BoardComponent from "$lib/components/BoardComponent.svelte";

    let board = {
        id: "af956606-cc05-45c0-947f-7449e32720d9",
        title: "First Board",
        description: "My first board",
        lanes: [
            {
                id: "23c21f78-d14c-44b8-8b57-f24a42e56150",
                title: "Backlog",
                items: [
                    {
                        id: "c0d19751-d75b-4c1e-8180-70330dd395ee",
                        title: "Get Card",
                        description: "sample",
                        prio: 1,
                        color: "#c056c2",
                    },
                    {
                        id: "b0fc2365-90bb-4270-879e-cdfa7821a4c5",
                        title: "Add Card to Collection",
                        description: "sample",
                        prio: 1,
                        color: "#c056c2",
                    },
                    {
                        id: "916c6a2e-8e3a-4acf-b803-a0cbaaee20b3",
                        title: "bar",
                        description: "sample",
                        prio: 1,
                        color: "#444",
                    },
                ],
            },
            {
                id: "c3950495-1624-4f15-a095-2e25f7feb1ac",
                title: "In Progress",
                items: [],
            },
            {
                id: "327f2f3d-8517-43fd-811a-9e4fcb4d4926",
                title: "Done",
                items: [],
            },
        ],
    };
</script>
<BoardComponent {board}/>