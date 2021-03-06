<script>
    import { fly } from 'svelte/transition';
    import { activeLocationName, locationInformation } from '../store';

    export let activeCardName;

    let mobile = window.innerWidth < 500;
    window.addEventListener('resize', () => mobile = window.innerWidth < 500);

    let information;
    
    $: if (activeCardName || $activeLocationName) {
        information = locationInformation[$activeLocationName][activeCardName ? activeCardName : Object.keys(locationInformation[$activeLocationName])[0]];
    } 

    function removeCard() {
        activeLocationName.set(null);
        activeCardName = null;
    }

    function switchCard(direction) {
        let index = activeCardName ? Object.keys(locationInformation[$activeLocationName]).indexOf(activeCardName) : 0;
        if (direction == 'left') {
            if (index == 0) activeCardName = Object.keys(locationInformation[$activeLocationName])[Object.keys(locationInformation[$activeLocationName]).length - 1];
            else activeCardName = Object.keys(locationInformation[$activeLocationName])[index - 1];
        } else {
            if (index == Object.keys(locationInformation[$activeLocationName]).length - 1) activeCardName = Object.keys(locationInformation[$activeLocationName])[0];
            else activeCardName = Object.keys(locationInformation[$activeLocationName])[index + 1];
        }
    }
</script>

<style>
    .card {
        display: flex;
        margin: auto;
        max-width: 1100px;
        pointer-events: all;
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.75);
    }
    .card-content {
        width: 100%;
        padding: 2rem;
        color: white;
        font-weight: 300;
        font-size: 1rem;
    }
    @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
        .card {
            -webkit-backdrop-filter: blur(25px);
            backdrop-filter: blur(25px);
            background: rgba(255, 255, 255, 0.05);
        }
    }
    .card-buttons {
        display: flex;
    }
    .card-text {
        margin: 3px 5px 0px 5px;
    }
    .card-chevron, .card-close {
        cursor: pointer;
    }
    .card-close {
        margin-left: auto;
    }
    .card-header {
        font-size: 1.2rem;
    }
    .card-information {
        display: flex;
        margin-top: 2rem;
        font-weight: 300;
    }
    .card-logo {
        margin-right: 2rem;
        width: 3rem;
    }
    .card-subheader {
        margin-top: 0.66rem;
    }
    .card-description {
        color: rgba(255, 255, 255, 0.75);
        margin-top: 2rem;
        line-height: 1.5rem;
    }
</style>

{#if $activeLocationName && information}

    <div class='card' transition:fly={{y: 100, duration: 250}}>
        <div class='card-content'>

            <div class='card-buttons'>
                <img class='card-chevron' src='/assets/icons/chevron-left.svg' alt='Left' on:click={() => switchCard('left')}>
                <div class='card-text'>{activeCardName ? Object.keys(locationInformation[$activeLocationName]).indexOf(activeCardName) + 1 : 1} / {Object.keys(locationInformation[$activeLocationName]).length}</div>
                <img class='card-chevron' src='/assets/icons/chevron-right.svg' alt='Right' on:click={() => switchCard('right')}>
                <img class='card-close' src='/assets/icons/x.svg' alt='x' on:click={removeCard}>
            </div>
    
            <div class='card-information'>
                <img class='card-logo' src={information.logo} alt='RBC Logo'>
                <span class='card-info'>
                    <div class='card-header'>{information.header}</div>
                    <div class='card-subheader'>{information.subheader}</div> 
                </span>
            </div>
    
            {#if !mobile}
                <div class='card-description'>{information.location} — {information.description}</div> 
            {/if}

        </div>
    </div>

{/if}