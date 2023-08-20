<script lang="ts">
    import BoardComponent from "$lib/components/BoardComponent.svelte";
    import board from './tcgbuddy.json'
</script>
<BoardComponent {board} shouldSaveState={false}/>