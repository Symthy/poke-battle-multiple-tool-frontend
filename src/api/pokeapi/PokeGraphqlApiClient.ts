import { urqlClient } from "@/lib/urql";
import { DocumentNode } from "graphql";
import {
  Client,
} from "urql";

export class PokeGraphqlApiClient {
  private client: Client;

  constructor(endpoint: string) {
    this.client = urqlClient(endpoint);
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
export const pokeGqlApiClient = new PokeGraphqlApiClient(endpoint);
