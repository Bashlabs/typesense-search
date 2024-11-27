const { algoliasearch, instantsearch } = window;
const { autocomplete } = window['@algolia/autocomplete-js'];

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

// const { createLocalStorageRecentSearchesPlugin } =
//   window['@algolia/autocomplete-plugin-recent-searches'];
//  const { createQuerySuggestionsPlugin } =
//    window['@algolia/autocomplete-plugin-query-suggestions'];

//const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'lALOvVbLIpc6pDAw629DxzQXcMQcersE', // Be sure to use the search-only-api-key
    nodes: [
      {
        host: '9xftcj8r50he2u4vp-1.a1.typesense.net',
        port: 443,
        protocol: 'https',
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: 'embedding',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: 'ip_profiles',
});
//

const virtualSearchBox = instantsearch.connectors.connectSearchBox(() => {});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <img src="" align="left" alt="" />
          <div class="hit-name">
          <p>
            <b>Country:</b> {{#helpers.highlight}}{ "attribute": "country" }{{/helpers.highlight}}
           </p> <p>
     <b>Intro:</b> {{#helpers.highlight}}{ "attribute": "intro" }{{/helpers.highlight}}
            </p>
           <p>
     <b>About:</b> {{#helpers.highlight}}{ "attribute": "story" }{{/helpers.highlight}}
            </p>
            </div>
          <div class="hit-description">
 <b>Type of couple</b> : {{#helpers.highlight}}{ "attribute": "type_of_couple" }{{/helpers.highlight}}
            </div>
             <div class="hit-description">
 <p>
 <b>relationship status</b> : {{#helpers.highlight}}{ "attribute": "relationship_status" }{{/helpers.highlight}}
</p>
            </div>
          <div class="hit-price"></div>
        </div>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
