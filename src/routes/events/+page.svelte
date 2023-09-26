<TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
        <Section>
            <Title>CosmoEvents</Title>
        </Section>
        <Section align="end" toolbar>
            <form method=POST action="?/logout">
                <IconButton class="material-icons" aria-label="Se déconnecter"
                >logout
                </IconButton>
            </form>
        </Section>
    </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
</AutoAdjust>

<LayoutGrid>
    {#each Array(upcoming_events.length) as _unused, i}
        <Cell span="{12}">
            <Card>
                <Content class="card-content-title">{upcoming_events[i].Title}</Content>
                <Content class="card-content">Date : {upcoming_events[i].Start}
                    à {upcoming_events[i].End}</Content>
                <Content class="card-content">Lieu : {upcoming_events[i].Place}</Content>
                <Content class="card-content">Nombre de bénévoles attendu
                    : {upcoming_events[i].NbVolunteers}</Content>
                <Content class="card-content">Bénévoles déjà inscrits : {upcoming_events[i].Volunteers}</Content>
                <Row>
                    <Section align="end">
                        {#if !upcoming_events[i].isRegistered}
                            <form method='POST' action="?/register">
                                <input type="text" hidden id="event_id" name="event_id" placeholder={upcoming_events[i].Id}/>
                                <Button variant="raised">
                                    <Label>Je veux organiser</Label>
                                    <i class="material-icons" aria-hidden="true">arrow_forward</i>
                                </Button>
                            </form>
                        {:else}
                            <Button variant="raised" disabled>
                                <Label>Déjà inscrit</Label>
                                <i class="material-icons" aria-hidden="true">done</i>
                            </Button>
                        {/if}
                    </Section>
                </Row>
            </Card>
        </Cell>
    {/each}
</LayoutGrid>

<script lang="ts">
    import TopAppBar, {
        Row,
        Section,
        Title,
        AutoAdjust,
    } from '@smui/top-app-bar';
    import LayoutGrid, {Cell} from "@smui/layout-grid";
    import Card, {
        Content,
        Actions
    } from '@smui/card';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';

    import type {PageData, ActionData} from './$types';

    export let data: PageData;
    $: upcoming_events = data.upcoming_events;

    export let form: ActionData;

    let topAppBar: TopAppBar;

</script>

<style>
    /* Hide everything above this component. */
    :global(#smui-app),
    :global(body),
    :global(html) {
        display: block !important;
        height: auto !important;
        width: auto !important;
        position: static !important;
    }

    :global(.card-content-title) {
        font: bold 1.5em "Roboto", sans-serif;
    }

    :global(.card-content) {
        font: 1em "Roboto", sans-serif;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }
</style>
