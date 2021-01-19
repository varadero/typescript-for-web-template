import { DomHelper } from './dom-helper';
import {
    Agent, AgentConfigurationMessageBody, ClientSession, IAvayaCustomerServices, Interaction, InteractionDeletedMessageBody, SdkInteraction,
    Work
} from './interfces';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const AvayaCustomerServices: any;
// eslint-disable-next-line @typescript-eslint/naming-convention
// declare const AvayaClientServices: any;

export class App {
    private elements: IElements;
    private domHelper = new DomHelper();
    private client: IAvayaCustomerServices;
    private clientSession: ClientSession;
    private agent: Agent;
    private work: Work;
    private token: string;
    private interactionIds: string[] = [];
    private agentConfig: AgentConfigurationMessageBody;

    start(): void {
        this.elements = this.setElements();
        this.setCallbacks();
    }

    getTokenValue(): string {
        let tokenValue = this.elements.txtToken.value;
        if (tokenValue.startsWith('Bearer ')) {
            tokenValue = tokenValue.substr(7);
        }
        return tokenValue;
    }

    btnCreateSessionClicked(): void {
        const tokenValue = this.getTokenValue();
        const serverEndpoint = this.elements.txtURL.value;
        const uacConfig = this.createUacConfiguration(serverEndpoint);
        this.client = new AvayaCustomerServices({ uacConfiguration: uacConfig });
        // Start Client Session service
        this.clientSession = this.client.createClientSession();
        // Set token to SDK token store
        const authToken = { header: 'Authorization', value: 'Bearer ' + tokenValue };
        this.clientSession.setToken(authToken);
    }

    btnConnectClicked(): void {
        const tokenValue = this.getTokenValue();
        this.clientSession.getConfiguration(this.elements.txtUsername.value).then(cfg => {
            this.agentConfig = cfg;
            this.log('Configuration loaded', cfg.user.userHandle);
            const sdkConfig: any = {};
            if (cfg.configuration.isWebRTC) {
                sdkConfig.networkConfiguration = {
                    hostName: cfg.configuration.aawgFQDN,
                    port: 443,
                    isSecure: true
                };
                sdkConfig.callUserConfiguration = {
                    incomingCall: true,
                    videoEnabled: true,
                    videoMaxBandwidthAnyNetwork: 1024
                };
                sdkConfig.sgConfiguration = {
                    enabled: true,
                    authToken: tokenValue
                };
            }
            const cpConfig = new AvayaCustomerServices.Config.CPConfiguration(sdkConfig);
            this.clientSession.setConfig({ cpConfiguration: cpConfig });
        });


        // const uacConfig = this.createUacConfiguration(serverEndpoint);
        // this.client = new AvayaCustomerServices({ uacConfiguration: uacConfig });
        // try {
        //     AvayaCustomerServices.Base.Logger.removeLogger(console);
        //     // eslint-disable-next-line no-empty
        // } catch (err) {
        // }
        // this.client.registerLogger(console);
        // this.token = tokenValue;
        // this.clientSession = this.client.createClientSession();
        // this.clientSession.setToken({ header: 'Authorization', value: 'Bearer ' + tokenValue });
        // this.addSessionListeners();
        // this.startSession();
    }

    btnActivateClicked(): void {
        if (this.agentConfig.configuration.isWebRTC) {
            this.startClientSession();
        }
    }

    btnGoReadyClicked(): void {
        this.agent.goReady();
    }

    btnAcceptClicked(): void {
        const lastInteraction = this.findInteraction(this.interactionIds[this.interactionIds.length - 1]);
        if (lastInteraction) {
            lastInteraction.accept();
        }
    }

    btnDisableLocalVideoClicked(): void {
        const lastInteraction = this.findInteraction(this.interactionIds[this.interactionIds.length - 1]);
        if (lastInteraction) {
            lastInteraction.disableLocalVideo();
        }
    }

    btnEnableLocalVideoClicked(): void {
        const lastInteraction = this.findInteraction(this.interactionIds[this.interactionIds.length - 1]);
        if (lastInteraction) {
            lastInteraction.enableLocalVideo();
        }
    }

    activate(): void {
        this.agent.activate(this.agentConfig.user.userHandle);
    }

    // async btnGetConfigurationClicked(): Promise<void> {
    //     this.agentConfig = await this.clientSession.getConfiguration(this.elements.txtUsername.value);
    // }

    private async startClientSession(): Promise<void> {
        this.addSessionListeners();
        this.clientSession.start();

        this.agent = this.clientSession.createAgent();
        this.addAgentListeners();

        this.work = this.clientSession.createWork();
        this.addWorkListeners();
    }

    createUacConfiguration(serverEndpoint: string): any {
        const sdkConfig = {
            authenticationInfo: { enabled: true, tokens: ['Authorization'] },
            clientInfo: { id: 'avaya.adfconnect' },
            enabled: true,
            notificationInfo: {
                broadcastUrl: serverEndpoint + '/services/Broadcast-UnifiedAgentController/broadcast', fallbackTransport: 'websocket'
            },
            serverInfo: { apiUrl: serverEndpoint + '/services/UnifiedAgentController/UACAPI' }
        };
        const sdkUacConfig = new AvayaCustomerServices.Config.UACConfiguration(sdkConfig);
        return sdkUacConfig;
    }

    log(text: string, ...optionalParams: any[]): void {
        this.domHelper.addLineToTextarea(this.elements.txtLog, text);
        console.log(text, ...optionalParams);
    }

    // async createSession(serverEndpoint: string, token: string): Promise<void> {
    //     const cpConfig = new AvayaCustomerServices.Config.CPConfiguration({
    //         callUserConfiguration: {
    //             incomingCall: true,
    //             videoEnabled: true,
    //             videoMaxBandwidthAnyNetwork: 1024
    //         },
    //         sgConfiguration: {
    //             enabled: true,
    //             authToken: token,
    //             networkConfiguration: {
    //                 hostName: loadedConfig.aawgFQDN,
    //                 isSecure: true
    //             }
    //         },
    //         logger: console
    //     });
    //     this.client = new AvayaCustomerServices({ uacConfiguration: uacConfig });
    //     if (logger) {
    //         try {
    //             AvayaCustomerServices.Base.Logger.removeLogger(logger);
    //         } catch (err) {
    //         }
    //         this.client.registerLogger(logger);
    //     }
    //     this.token = token;
    //     this.clientSession = this.client.createClientSession();
    //     this.clientSession.setToken({ header: 'Authorization', value: 'Bearer ' + token });
    //     this.addSessionListeners();
    // }

    setCallbacks(): void {
        this.elements.btnCreateSession.onclick = () => this.btnCreateSessionClicked();
        this.elements.btnGetConfig.onclick = () => this.btnConnectClicked();
        this.elements.btnActivate.onclick = () => this.btnActivateClicked();
        this.elements.btnGoReady.onclick = () => this.btnGoReadyClicked();
        this.elements.btnAccept.onclick = () => this.btnAcceptClicked();
        this.elements.btnDisableLocalVideo.onclick = () => this.btnDisableLocalVideoClicked();
        this.elements.btnEnableLocalVideo.onclick = () => this.btnEnableLocalVideoClicked();
    }

    setElements(): IElements {
        const els: IElements = {
            txtURL: document.getElementById('txtURL') as HTMLInputElement,
            txtToken: document.getElementById('txtToken') as HTMLInputElement,
            txtUsername: document.getElementById('txtUsername') as HTMLInputElement,
            btnCreateSession: document.getElementById('btnCreateSession') as HTMLButtonElement,
            btnGetConfig: document.getElementById('btnGetConfig') as HTMLButtonElement,
            btnActivate: document.getElementById('btnActivate') as HTMLButtonElement,
            btnGoReady: document.getElementById('btnGoReady') as HTMLButtonElement,
            btnAccept: document.getElementById('btnAccept') as HTMLButtonElement,
            btnDisableLocalVideo: document.getElementById('btnDisableLocalVideo') as HTMLButtonElement,
            btnEnableLocalVideo: document.getElementById('btnEnableLocalVideo') as HTMLButtonElement,
            videoLocal: document.getElementById('videoLocal') as HTMLVideoElement,
            videoRemote: document.getElementById('videoRemote') as HTMLVideoElement,
            txtLog: document.getElementById('txtLog') as HTMLTextAreaElement
        };
        return els;
    }

    findInteraction(id: string): SdkInteraction | undefined {
        const interactions = this.work.getInteractions();
        const interaction = interactions.find({ id: id });
        return interaction;
    }

    addAgentListeners(): void {
        this.agent.addOnActivatedCallback(res => {
            this.log('Agent activated', res);
        });
        this.agent.addOnDeactivatedCallback(res => {
            this.log('Agent deactivated', res);
        });
        this.agent.addOnStateCompleteCallback(res => {
            this.log('Agent state complete', res);
        });
        this.agent.addOnStateLoggedOutCallback(res => {
            this.log('Agent state logged out', res);
        });
        this.agent.addOnStateLoginPendingCallback(res => {
            this.log('Agent state login pending', res);
        });
        this.agent.addOnStateLogoutPendingCallback(res => {
            this.log('Agent state logout pending', res);
        });
        this.agent.addOnStateNotReadyCallback(res => {
            this.log('Agent state not ready', res);
        });
        this.agent.addOnStateNotReadyPendingCallback(res => {
            this.log('Agent state not ready pending', res);
        });
        this.agent.addOnStateReadyCallback(res => {
            this.log('Agent state ready', res);
        });
        this.agent.addOnStateUnknownCallback(res => {
            this.log('Agent state unknown', res);
        });
    }

    addWorkListeners(): void {
        this.work.addOnInteractionCreatedCallback((createdInteraction: Interaction) => {
            const sdkInteraction = this.findInteraction(createdInteraction.id);
            if (!sdkInteraction) {
                // TODO: ? Publish a message that interaction was not found ?
                return;
            }
            this.log('Interaction created ' + createdInteraction.id);
            const index = this.interactionIds.indexOf(createdInteraction.id);
            if (index === -1) {
                this.interactionIds.push(createdInteraction.id);
                sdkInteraction.addOnInteractionActiveCallback((activeInteraction: Interaction) => {
                    this.log('Interaction active ' + activeInteraction.id);
                });
                sdkInteraction.addOnInteractionPassiveCallback((passiveInteraction: Interaction) => {
                    this.log('Interaction passive ' + passiveInteraction.id);
                });
                // sdkInteraction.addOnInteractionUnknownCallback((unknownInteraction: Interaction) => {
                // });
                // sdkInteraction.addOnInteractionACWPendingCallback((acwPendingInteraction: Interaction) => {
                // });
                // sdkInteraction.addOnInteractionACWCallback((acwInteraction: Interaction) => {
                // });
                sdkInteraction.addOnInteractionHeldCallback((heldInteraction: Interaction) => {
                    this.log('Interaction held ' + heldInteraction.id);
                });
                // sdkInteraction.addOnInteractionUpdatedCallback((updatedInteraction: Interaction) => {
                // });
                sdkInteraction.addOnInteractionUnheldCallback((unheldInteraction: Interaction) => {
                    this.log('Interaction unheld ' + unheldInteraction.id);
                });
                // TODO: This listener is no longer triggered after a page refresh
                sdkInteraction.addOnInteractionAudioUpdatedCallback(() => {
                    this.log('Interaction audio updated');
                });
                // sdkInteraction.addOnRemoteParticipantAcceptedCallback((message: InteractionAcceptedMessageBody) => {
                // });
                sdkInteraction.addOnInteractionVideoUpdatedCallback(int => {
                    // TODO: This callback is not called by the SDK
                    this.log('Interaction video updated', int);
                    if (int.direction === 'local') {
                        if (int.stream) {
                            this.log('Local stream added');
                            if (this.elements.videoLocal.srcObject !== int.stream) {
                                this.elements.videoLocal.srcObject = int.stream;
                            }
                        } else {
                            this.log('Local stream removed');
                        }
                    } else if (int.direction === 'remote') {
                        if (int.stream) {
                            this.log('Remte stream added');
                            if (this.elements.videoRemote.srcObject !== int.stream) {
                                this.elements.videoRemote.srcObject = int.stream;
                            }
                        } else {
                            this.log('Remote stream removed');
                        }
                    }
                });
            }
        });

        this.work.addOnInteractionDeletedCallback((deletedInteraction: InteractionDeletedMessageBody) => {
            const index = this.interactionIds.indexOf(deletedInteraction.id);
            if (index > -1) {
                this.interactionIds.splice(index, 1);
            }
            this.log('Interaction deleted ' + deletedInteraction.id);
        });
    }

    addSessionListeners(): void {
        this.clientSession.addOnClientSessionStartedCallback(async res => {
            this.log('Session started', res);
            // this.agentConfig = await this.clientSession.getConfiguration(this.elements.txtUsername.value);
            // this.log('Configuration loaded', this.agentConfig);
            // if (this.agentConfig.configuration.isWebRTC) {
            //     const cpConfig = new AvayaCustomerServices.Config.CPConfiguration({
            //         callUserConfiguration: {
            //             incomingCall: true,
            //             videoEnabled: true,
            //             videoMaxBandwidthAnyNetwork: 1024
            //         },
            //         sgConfiguration: {
            //             enabled: true,
            //             authToken: this.agentConfig.token,
            //             networkConfiguration: {
            //                 hostName: this.agentConfig.configuration.aawgFQDN,
            //                 isSecure: true
            //             }
            //         },
            //         logger: console
            //     });
            //     this.clientSession.setConfig({ cpConfiguration: cpConfig });
            // }
        });

        this.clientSession.addOnClientSessionRestartedCallback(res => {
            this.log('Session restarted', res);
        });

        this.clientSession.addOnClientSessionClosedCallback(res => {
            this.log('Session closed', res);
        });

        this.clientSession.addOnUserRegistrationSuccessfulCallback(res => {
            this.log('User registered', res);
            this.activate();
        });

        this.clientSession.addOnUserRegistrationFailedCallback(res => {
            this.log('user registration error', res);
        });
    }
}

new App().start();

interface IElements {
    txtURL: HTMLInputElement;
    txtToken: HTMLInputElement;
    txtUsername: HTMLInputElement;
    btnCreateSession: HTMLButtonElement;
    btnGetConfig: HTMLButtonElement;
    btnActivate: HTMLButtonElement;
    btnGoReady: HTMLButtonElement;
    btnAccept: HTMLButtonElement;
    btnDisableLocalVideo: HTMLButtonElement;
    btnEnableLocalVideo: HTMLButtonElement;
    videoLocal: HTMLVideoElement;
    videoRemote: HTMLVideoElement;
    txtLog: HTMLTextAreaElement;
}
