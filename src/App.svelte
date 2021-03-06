<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import * as render from './webgl/render';
    import { activeLocationName, locationInformation } from './store';

    import Navigation from './views/Navigation.svelte';
    import Header from './views/Header.svelte';
    import Card from './views/Card.svelte';
    import Loader from './views/Loader.svelte';

    let rendered = false;
    let activeCardName = null;

    // detect if small navigation should be shown
    let smallNav = window.innerWidth < 1200;
    window.addEventListener('resize', () => smallNav = window.innerWidth < 1200);

    // if location changes, set active card to null
    $: if ($activeLocationName) activeCardName = null;
    
    // if active card changes, set location to location of new active card
    $: if (activeCardName) {
        for (let key of Object.keys(locationInformation))
            if (activeCardName in locationInformation[key])
                activeLocationName.set(key);
    };

    // render webgl content
    onMount(async () => {
        // await render.loadModel();
        await render.loadTextures();
        await render.initialize();
        rendered = await render.display();
        document.getElementById('webgl-container').style = 'opacity: 1';
        render.animate();
    });
</script>

<style>
    #webgl-container {
        position: fixed;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: 2s;
    }
    .center {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-20px, -20px);
    }
    .content {
        position: fixed;
        height: calc(100% - 80px);
        width: calc(80%);
        z-index: 2;
        pointer-events: none;
        margin: 40px 10%;
    }
    .card-position {
        position: fixed;
        width: calc(80%);
        bottom: 40px;
    }
</style>

{#if !rendered}

    <div class='center'>
        <Loader></Loader>
    </div>

{:else}

    <div class='content' transition:fade={{duration: 2000}}>
        <Navigation bind:activeCardName={activeCardName} smallNav={smallNav}></Navigation>
        <Header smallNav={smallNav}></Header>
        <div class='card-position'>
            <Card bind:activeCardName={activeCardName}></Card>
        </div>
    </div>

{/if}

<section id='webgl-container'></section>