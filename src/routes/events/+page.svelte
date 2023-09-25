<TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
        <Section>
            <Title>CosmoEvents</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton class="material-icons" aria-label="Se déconnecter"
            >logout
            </IconButton
            >
        </Section>
    </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
</AutoAdjust>

<LayoutGrid>
    <Cell span="{12}">
            <Card>
                <Content class="card-content-title">CosmoApéro</Content>
                <Content class="card-content">Date : 26/09/2023</Content>
                <Content class="card-content">Lieu : Bar</Content>
                <Content class="card-content">Bénévoles déjà inscrits : Tom S., Antoine M.</Content>
                <Row>
                    <Section align="end">
                        <Actions>
                            <Button variant="raised" on:click={() => clicked++}>
                                <Label>S'inscrire</Label>
                                <i class="material-icons" aria-hidden="true">arrow_forward</i>
                            </Button>
                        </Actions>
                    </Section>
                </Row>
            </Card>
    </Cell>
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

    let clicked = 0;

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
        line-height: 0.1em;
    }
</style>
