import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  AppWebsocket,
  AppClient,
} from '@holochain/client';
import { provide } from '@lit-labs/context';
import '@material/mwc-circular-progress';

import { clientContext } from './contexts';

@customElement('holochain-app')
export class HolochainApp extends LitElement {
  @state() loading = true;
  @state() response = "";
  @state() error = "";


  @provide({ context: clientContext })
  @property({ type: Object })
  client!: AppClient;

  async firstUpdated() {
    // We pass '' as url because it will dynamically be replaced in launcher environments
    this.client = await AppWebsocket.connect();

    try {
      const res = await this.client.callZome({
        role_name: 'posts',
        zome_name: 'posts',
        fn_name: 'echo_version',
        payload: null
      });
      this.response = res;
    } catch(e) {
      this.error = JSON.stringify(e);
    }


    this.loading = false;
  }

  render() {
    if (this.loading)
      return html`
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      `;

    return html`
      <main>
        <h1>example2 UI</h1>
        <h2>Calling "echo_hello" function</h2>

        <b>Response:</b>
        <div style="margin-bottom: 50px">${this.response}</div>

        <b>Error:</b>
        <div>${this.error}</div>
      </main>
    `;
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-element-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;
}
