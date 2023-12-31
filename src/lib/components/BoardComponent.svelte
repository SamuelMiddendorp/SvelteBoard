<script lang="ts">
    import { setBoard } from "$lib/FakeFileStore";
    import type { Board, Lane } from "$lib/model";
    import { v4 as uuidv4 } from "uuid";

    let currentDropTarget: string;
    export let board: Board;
    export let shouldSaveState = true;
    let onDrop = (e: any, id: string) => {
        // Leverage setting of event data
        let itemId: string = e.dataTransfer.getData("itemId");
        let currentLaneId: string = e.dataTransfer.getData("laneId");

        // Get indexes to make direct adjustment
        let targetLaneIndex = board.lanes.findIndex((l) => l.id == id);
        let currentLaneIndex = board.lanes.findIndex(
            (l) => l.id == currentLaneId
        );

        // Get lanes
        let targetLane = board.lanes[targetLaneIndex];
        let currentLane = board.lanes[currentLaneIndex];

        // Get item
        let item = currentLane.items.find((i) => i.id == itemId)!;
        if (currentLane.id != targetLane.id) {
            currentLane.items = currentLane.items.filter((i) => i.id != itemId);
            targetLane.items = [...targetLane.items, item];
        }

        if (currentDropTarget != itemId) {
            // Remove first then splice back into the list
            let currentIndex = targetLane.items.findIndex(
                (x) => x.id == item.id
            );
            targetLane.items = targetLane.items.filter((x) => x.id != item.id);

            let targetIndex = targetLane.items.findIndex(
                (i) => i.id == currentDropTarget
            );

            console.log(targetIndex);
            let indexToSplice =
                currentIndex > targetIndex ? targetIndex : targetIndex + 1;
            targetLane.items.splice(indexToSplice, 0, item);
            console.log(targetLane);
        }
        // Update board

        board.lanes[targetLaneIndex] = targetLane;
        board.lanes[currentLaneIndex] = currentLane;

        let elem = document.getElementById(id)!;
        elem.style.border = "initial";

        saveState();
    };

    let onDragOver = (e: any, id: string) => {
        let elem = document.getElementById(id)!;
        elem.style.border = "1px solid #555";

        e.preventDefault();
    };

    let onDragLeave = (id: string) => {
        let elem = document.getElementById(id)!;
        elem.style.border = "initial";
    };

    let onDragStart = (e: any, itemId: string, laneId: string) => {
        // Set datatransfer when starting dragging of an item;
        e.dataTransfer.setData("itemId", itemId);
        e.dataTransfer.setData("laneId", laneId);
    };
    let addLane = () => {
        let newLane = { id: uuidv4(), title: "sample lane", items: [] };
        board.lanes = [...board.lanes, newLane];
        saveState();
    };

    let addItem = (laneId: string) => {
        let lane = board.lanes.find((l) => l.id == laneId)!;
        lane.items = [
            ...lane.items,
            { id: uuidv4(), title: "bar", description: "sample", prio: 1, color: "#444" },
        ];
        board.lanes[board.lanes.indexOf(lane)] = lane;
        saveState();
    };
    let duplicateItem = (itemId: string, laneId: string) => {
        let lane = board.lanes.find((l) => l.id == laneId)!;
        let laneIndex = board.lanes.findIndex((l) => l.id == laneId)!;
        let item = lane.items.find((i) => i.id == itemId)!;
        let itemIndex = lane.items.findIndex((i) => i.id == itemId);

        // copy over
        let newItem = {
            id: uuidv4(),
            title: item.title,
            description: item.description,
            prio: item.prio,
            color: item.color
        };

        lane.items.splice(itemIndex, 0, newItem);
        board.lanes[laneIndex] = lane;
    };
    let deleteLane = (lane: Lane) => {
        board.lanes = board.lanes.filter((x) => x != lane);
        saveState();
    };
    let saveState = () => {
        console.log(`Board updated to ${JSON.stringify(board)}`)
        if(shouldSaveState){
            setBoard(board);
        }
    };
</script>

{#if board}
    <div class="board">
        {#each board.lanes as lane}
            <div
                id={lane.id}
                role="group"
                on:drop={(e) => onDrop(e, lane.id)}
                on:dragover={(e) => onDragOver(e, lane.id)}
                on:dragleave={() => onDragLeave(lane.id)}
                class="lane"
            >
                <input type="text" class="input-h2" bind:value={lane.title} />
                <div class="items">
                    {#each lane.items as item (item.id)}
                        <div
                            role="listitem"
                            on:dragstart={(e) =>
                                onDragStart(e, item.id, lane.id)}
                            on:dragover={() => (currentDropTarget = item.id)}
                            draggable="true"
                            class="item"
                        >
                            <input type="text" bind:value={item.title} />
                            <button
                                on:click={() =>
                                    (lane.items = lane.items.filter(
                                        (x) => x != item
                                    ))}
                                class="del-button">-</button
                            >
                            <button
                                on:click={() => duplicateItem(item.id, lane.id)}
                                class="duplicate-button"
                            >
                                ⧉
                            </button>
                            <div style:background-color={item.color ?? "#444"} class="color">
                            <input type="color" on:change={() => saveState()} bind:value={item.color}></div>
                        </div>
                    {/each}
                    <div class="center">
                        <button on:click={() => addItem(lane.id)}>+</button>
                    </div>
                </div>
                <button on:click={() => deleteLane(lane)} class="del-button"
                    >-</button
                >
            </div>
        {/each}
        <div class="center">
            <button on:click={() => addLane()}>+</button>
        </div>
    </div>
{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap");

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        color: #fff;
    }

    :global(body) {
        background-color: #111;
    }

    input {
        all: unset;
        cursor: text;
    }

    .input-h2 {
        display: block;
        max-width: 100%;
        font-size: 1.5rem;
        cursor: text;
    }

    .color{
        transition: transform 0.2s ease-in-out;
        border-top-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        min-width: 5rem;
        min-height: 0.6rem;
        position: absolute;
        top: 0;
        left: 0;
    }
    .color:hover{
        transform: scaleX(1.2);
    }
    .color:hover input{
        cursor: pointer;
        display: block;
    }
    .color input{
        opacity: 0;
        display: none;
        width: 5rem;
    }
    .del-button {
        display: block;
        font-size: 1.8rem;
        position: absolute;
        bottom: 0;
        left: 1rem;
    }

    .duplicate-button {
        display: block;
        font-size: 1.1rem;
        position: absolute;
        bottom: 0;
        right: 1rem;
    }

    .board {
        position: relative;
        padding: 2rem;
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    }

    .lane {
        position: relative;
        border-radius: 0.4rem;
        padding: 1rem;
        background-color: #222;
    }

    .items {
        margin-top: 2rem;
        display: grid;
        gap: 1rem;
    }

    .item {
        overflow: hidden;
        position: relative;
        min-height: 6rem;
        border-radius: 0.4rem;
        padding: 1rem;
        background-color: #333;
        cursor: grab;
    }

    .center {
        display: grid;
        place-content: center;
    }

    button {
        all: unset;
        transition: all 0.4s ease-out;
        font-weight: 900;
        font-size: 2rem;
        cursor: pointer;
    }

    button:hover{
        transform: translateY(-0.2rem);
        color: #999;
    }
</style>
