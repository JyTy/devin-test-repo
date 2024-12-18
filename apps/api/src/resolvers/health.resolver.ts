import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HealthResolver {
  @Query(_returns => String)
  async health(): Promise<string> {
    return 'OK';
  }
}
