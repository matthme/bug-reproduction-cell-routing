import { createContext } from '@lit-labs/context';
import { AppClient } from '@holochain/client';

export const clientContext = createContext<AppClient>('appAgentClient');

