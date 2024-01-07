import { DocumentNode } from "graphql";
import {
  createClient,
  ClientOptions,
  Client,
  cacheExchange,
  fetchExchange,
} from "urql";

export class PokeGraphqlApiClient {
  private client: Client;

  constructor(endpoint: string) {
    const clientOptions: ClientOptions = {
      url: endpoint,
      exchanges: [cacheExchange, fetchExchange],
    };
    this.client = createClient(clientOptions);
  }

  async query<T>(
    query: DocumentNode,
    variables?: Record<string, any>
  ): Promise<T> {
    const response = await this.client.query<T>(query, variables).toPromise();
    if (response.error || !response.data) {
      throw response.error;
    }
    return response.data;
  }
}

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";
const pokeGqlApiClient = new PokeGraphqlApiClient(endpoint);

export default pokeGqlApiClient;
