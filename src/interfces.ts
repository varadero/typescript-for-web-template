/* eslint-disable capitalized-comments */
/* eslint-disable @typescript-eslint/naming-convention */
export interface IAvayaCustomerServices {
    registerLogger(logger: any): void;
    createClientSession(): ClientSession;
}

export interface ClientSession {
    start(): void;
    stop(): void;
    setToken(token: { header: string; value: string }): void;
    // setData(data: any): any;
    setConfig(config: any): void;
    getConfiguration(username: string): Promise<AgentConfigurationMessageBody>;
    createAgent(): Agent;
    removeAgent(): void;
    getAgent(): Agent;
    createWork(): Work;
    removeWork(): void;
    getWork(): Work;
    // createTeam(): Team;
    // removeTeam(): void;
    // getTeam(): any;
    // createContacts(): Contacts;
    // removeContacts(): void;
    // getContacts(): any;
    getReasonCodes(): any;
    removeCallbacks(): void;

    addOnCloseCallback(callback: (res: any) => void): void;
    addOnErrorCallback(callback: (res: any) => void): void;
    addOnClientSessionStartedCallback(callback: (res: any) => void): void;
    addOnClientSessionRestartedCallback(callback: (res: any) => void): void;
    addOnClientSessionClosedCallback(callback: (res: any) => void): void;
    addOnResourceAcquiredCallback(callback: (res: any) => void): void;
    addOnResourceReleasedCallback(callback: (res: any) => void): void;
    addOnResourceSessionOutboundConnectedCallback(callback: (res: any) => void): void;
    addOnResourceSessionOutboundNotConnectedCallback(callback: (res: any) => void): void;
    addOnResourceSessionOutboundFailedCallback(callback: (res: any) => void): void;
    addOnResourceSessionOutboundDeletedCallback(callback: (res: any) => void): void;
    addOnResourceSessionWorkModeCreatedCallback(callback: (res: any) => void): void;
    addOnResourceSessionWorkModeUpdatedCallback(callback: (res: any) => void): void;
    addOnResourceSessionWorkModeDeletedCallback(callback: (res: any) => void): void;
    addOnUserRegistrationSuccessfulCallback(callback: (res: any) => void): void;
    addOnUserRegistrationFailedCallback(callback: (res: any) => void): void;
    addOnDeferredInteractionCallback(callback: (res: any) => void): void;
    addOnRemoveDeferredInteractionCallback(callback: (res: any) => void): void;
}

export interface AgentConfigurationMessageBody {
    authTimestamp: string;
    configuration: {
        aadsFQDN: string;
        aawgFQDN: string;
        awfosEnabled: boolean;
        coBrowseFQDN: string;
        coBrowseURL: string;
        contextStoreClusterIP: string;
        customerManagementFQDN: string;
        deferTimeIntervals: number[];
        displayCanvasOnAlerting: boolean;
        environmentType: EnvironmentType;
        genericChannelFriendlyName: string;
        genericChannelIcon: string;
        hotdesk: boolean;
        isWebRTC: boolean;
        maxDeferTime: string; // number as string - "43020"
        observeIndicatorEnabled: boolean;
        ocdsFQDN: string;
        ocpAddress: string;
        ocpFQDN: string;
        salesforceConfiguration: {
            ApplicationName: string;
            CRMIntegrationEnabled: string;
            ConsumerKey: string;
            ConsumerSecretKey: string;
            ProxyServerURL: string;
            SalesforceEndpoint: string;
        };
        screenPopConfiguration: {
            DisplayInternalScreenpopWidgetFirstOnAgentAccept: string; // boolean as string - "true"
            EnableScreenpopWithoutAgentprompting: string; // boolean as string - "true"
            LaunchExternalScreenpopsOnAgentAccept: string; // bolean as string - "true"
        };
        suggestedCustomLinkURL?: string;
        supervisorReportingURL: string;
        tokenExpiryInterludeInMinutes: string; // number as string - "30"
        trunkAccessCode: string;
        websocketsEnabled: boolean;
        welcomePage: string;
        workspacesLogUploadLocation: string;
        workspacesLogsDownloadEnabled: boolean;
    };
    defaultUserProfileId: string;
    emailSignaturePreferences: AgentConfigurationPreference[];
    layoutPreferences: AgentConfigurationPreference[];
    pomAgent: string;
    token: string;
    user: {
        analyticsRoleId: string;
        displayName: string;
        firstName: string;
        id: string;
        lastName: string;
        roleId: string;
        supervisorUserId: string;
        tenantId: string;
        userHandle: string;
        versionId: number;
    };
    userPreferences: any[]; // ? AgentConfigurationPreference ?
    userProfileDetailsList: UserProfileDetails[];
}

export const enum EnvironmentType {
    oceana = 'OCEANA',
    elite = 'ELITE'
}

export interface AgentConfigurationPreference {
    group: string;
    id: string;
    key: string;
    type: string;
    value: any;
}

export interface UserProfileDetails {
    defaultResource: {
        address: string;
        channelType: string;
        channelTypes: string[];
        displayName: string;
        id: string;
        providerId: string;
        resourceType: string;
        tenantId: string;
        versionId: number;
    };
    numberResources: number;
    userProfile: {
        authServerUserId: string;
        id: string;
        listenerEventType: string;
        profileName: string;
        ucabaseObject: {
            authServerUserId: string;
            id: string;
            listenerEventType: string;
            profileName: string;
            versionId: number;
        };
    };
}

export interface Agent {
    activate(userHandle: string, profileId?: string, extensionAddress?: string, oldClientSessionId?: string): Promise<void>;
    deactivate(): Promise<any>;
    login(loginState?: string, workMode?: string): Promise<void>;
    logout(logoutReason?: string): Promise<void>;
    goReady(workMode?: string): Promise<void>;
    goNotReady(notReadyReason?: string): Promise<void>;
    goAfterContactWork(): Promise<void>;
    addOnActivatedCallback(callback: (res: any) => void): void;
    addOnDeactivatedCallback(callback: (res: any) => void): void;
    addOnStateLoginPendingCallback(callback: (res: any) => void): void;
    addOnStateReadyCallback(callback: (res: any) => void): void;
    addOnStateNotReadyPendingCallback(callback: (res: any) => void): void;
    addOnStateNotReadyCallback(callback: (res: any) => void): void;
    addOnStateAfterContactWorkPendingCallback(callback: (res: any) => void): void;
    addOnStateAfterContactWorkCallback(callback: (res: any) => void): void;
    addOnStateLogoutPendingCallback(callback: (res: any) => void): void;
    addOnStateLoggedOutCallback(callback: (res: any) => void): void;
    addOnStateCompleteCallback(callback: (res: any) => void): void;
    addOnStateUnknownCallback(callback: (res: any) => void): void;
    addOnUserPreferenceAddedCallback(callback: (res: any) => void): void;
    addOnUserPreferenceUpdatedCallback(callback: (res: any) => void): void;
    addOnUserPreferenceRemovedCallback(callback: (res: any) => void): void;
    addOnConfigurationAddedCallback(callback: (res: any) => void): void;
    addOnConfigurationUpdatedCallback(callback: (res: any) => void): void;
    addOnConfigurationRemovedCallback(callback: (res: any) => void): void;
    addOnReasonCodesUpdatedCallback(callback: (res: any) => void): void;
    removeCallbacks(): void;

    // isActivated(): boolean;
    // getHandle(): string;
    // getProfileId(): string;
    // getUserPreferences(): any;
    // getRole(): string;
    // setUserPreference(preference: any, profileId?: string, accountId?: string): Promise<void>;
    // removeUserPreference(preferenceId: string | string[], profileId?: string, accountId?: string): Promise<void>;
    // setUserPreferenceData(data: any): any;
    // removeUserPreferenceData<T>(data: T): T | false;
    // getSystemPreferences(): any[];
    // setSystemPreference(preference: any | any[]): Promise<void>;
    // removeSystemPreference(preferenceId: string | string[]): Promise<void>;
    // setSystemPreferenceData(data: any): any;
    // removeSystemPreferenceData<T>(data: T): T | false;
    // getClientSessions(authServerUser: any): Promise<void>;
    // getDevices(): any[];
    // setData(data: any): any;
}

export interface Work {
    addOnInteractionDeletedCallback(callback: (interactionDeletedMessage: any) => void): void;
    addOnInteractionCreatedCallback(callback: (interactionCreatedMessage: any) => void): void;
    createInteraction(type: string, destination: string): Promise<void>;
    getInteractions(): ICollection<any>;
    retrieveDeferredInteraction(interaction: Interaction): Promise<any>;
}

export interface ICollection<T> {
    find(criteria: any): T;
    add(item: T): void;
}

export interface Interaction {
    // Unique identifier for Interaction
    id: string;
    // Contact ID for Interaction
    contactId: string;
    // Resource channel type of Interaction
    channel: ChannelType;
    // Current state of Interaction
    state: InteractionState;
    // ISOString Date of when Interaction was created
    createdAt: string;
    // Contains list of interaction capabilities
    capabilities: InteractionCapabilities;
    // Work Request ID
    workRequestId: string;
    // Source address of Interaction
    originatingAddress: string;
    // Destination address of Interaction
    destinationAddress: string;
    // Is the call INCOMING or OUTGOING?
    direction: InteractionDirection;
    // Flag to indicate if interaction originated from customer
    isCustomerInteraction: boolean;
    // ???
    isRoutingDefaulted: boolean;
    // Work Code for Interaction
    workCode?: string;
    // Disposition Code for Interaction
    // TODO: API documentation sets this as string but actual data received by the server is an object
    //       So we need to connect to real server to check
    // dispositionCode?: string;
    dispositionCode?: {
        code: string;
        name: string;
        agentId: string;
        agentName: string;
    };
    // Array of participant involved in Interaction
    participants: Participant[];
    // Interaction data passed from one agent to another
    userToUserInfo?: string;
    // Flag to indicate if interaction is a WebRTC call
    isWebRtcCall: boolean;
    // Flag to indicate if ACW is enabled
    isACWEnabled: boolean;
    // Flag to indicate if Interaction is in ACW extended state
    isACWExtended?: boolean;
    // Flag to indicate if Auto Answer is enabled for this Interaction
    isAutoAnswerEnabled: boolean;
    // Datetime of when Auto Answer Timer expires
    autoAnswerTimerExpireDT: string;
    // Interaction topic
    topic: string;
    // Interaction topic ID
    topicId: string;
    // Timestamp of when Interaction was established
    establishedTime: string;
    // Timestamp of when Interaction last changed state
    stateChangeTime: string;
    // Timestamp of when Interaction last changed state (alternative to the above one)
    lastStateChangeTime: string;
    // Timestamp of when Interaction initiated ACW
    acwEstablishedTime?: string;
    // Duration of ACW countdown
    acwDuration?: string;
    // External Provider's Interaction ID
    externalInteractionId: string;
    // Details of Interaction context
    interactionType: InteractionType;
    // Reason for Interaction going into a particular state
    stateReason: string;
    // Flag that indicates if interaction is being observed by supervisor
    isObserved: boolean;
    // Flag that indicates if interaction has being transferred to service
    isTransferredToService: boolean;
    // Skill associated with Interaction
    skill?: string;
    // Skill ID associated with Interaction
    skillId?: string;
}

export const enum ChannelType {
    voice = 'VOICE',
    video = 'VIDEO',
    webchat = 'WEBCHAT',
    sms = 'SMS',
    social = 'SOCIAL',
    email = 'EMAIL',
    generic = 'GENERIC'
}

export const enum InteractionState {
    initiated = 'INITIATED',
    alerting = 'ALERTING',
    active = 'ACTIVE',
    acw = 'ACW',
    held = 'HELD',
    passive = 'PASSIVE'
}

export interface Participant {
    participantType: string;
    participantName: string;
    participantAddress: string;
    muted: boolean;
    isSelf: boolean;
}

export interface InteractionCapabilities {
    canReject: boolean;
    canSetUui: boolean;
    canConsult: boolean;
    canTransferComplete: boolean;
    canEnd: boolean;
    canSupervisorForceEnd: boolean;
    canConferenceComplete: boolean;
    canSetWorkCode: boolean;
    canSetDispositionCode: boolean;
    canExtendACW: boolean;
    canSingleStepTransfer: boolean;
    canSingleStepTransferToService: boolean;
    canConsultToService: boolean;
    canUnmute: boolean;
    canUnhold: boolean;
    canCompleteACW: boolean;
    canMute: boolean;
    canSetACW: boolean;
    canHold: boolean;
    canIgnore: boolean;
    canAccept: boolean;
    canSendDtmf: boolean;
    canForward: boolean;
    canSendMessage: boolean;
    canAddAttachment: boolean;
    canObserve: boolean;
    canBarge: boolean;
    canCoach: boolean;
    canReply: boolean;
    canSingleStepConference: boolean;
    canDefer: boolean;
}

export const enum InteractionDirection {
    incoming = 'INCOMING',
    outgoing = 'OUTGOING'
}

export const enum InteractionType {
    called = 'CALLED',
    calling = 'CALLING',
    consulting = 'CONSULTING',
    conferenced = 'CONFERENCED',
    transferred = 'TRANSFERRED',
    transferringToService = 'TRANSFERRING_TO_SERVICE',
    consulted = 'CONSULTED',
    consultedToService = 'CONSULTED_TO_SERVICE',
    observing = 'OBSERVING',
    coached = 'COACHED',
    coaching = 'COACHING',
    bargeIn = 'BARGE_IN'
}

export interface SdkInteraction {
    id: string;
    workRequestId: string;
    isNew: boolean;
    data: Interaction;
    accept(): Promise<any>;
    reject(): Promise<any>;
    end(uui?: string): Promise<any>;
    completeACW(): Promise<any>;
    extendACW(): Promise<any>;
    hold(): Promise<any>;
    unhold(): Promise<any>;
    muteAudio(): Promise<any>;
    unmuteAudio(): Promise<any>;
    defer(duration: string, reasonCode: string): Promise<any>;
    getServices(): Promise<any[]>;
    consult(remoteAddress: string, uui?: string): Promise<any>;
    singleStepTransfer(remoteAddress: string, uui?: string): Promise<any>;
    singleStepTransferToService(serviceId: string, uui?: string): Promise<any>;
    consultToService(serviceId: string, uui?: string): Promise<any>;
    singleStepTransferConference(phoneNumber: string, uui?: string): Promise<any>;
    completeConference(): Promise<any>;
    completeTransfer(): Promise<any>;
    setDispositionCode(dispositionCode: string): Promise<any>;
    setWorkCode(workCode: string): Promise<any>;
    sendDTMF(dtmf: string): Promise<any>;
    isAudioMuted(): Promise<boolean>;
    // removeParticipant(participant: string): Promise<any>;
    addOnInteractionActiveCallback(callback: (interaction: Interaction) => void): void;
    addOnInteractionPassiveCallback(callback: (interaction: Interaction) => void): void;
    addOnRemoteParticipantAcceptedCallback(callback: (interaction: InteractionAcceptedMessageBody) => void): void;
    addOnInteractionVideoUpdatedCallback(callback: (video: any) => void): void;
    addOnInteractionUpdatedCallback(callback: (interaction: Interaction) => void): void;
    addOnInteractionACWPendingCallback(callback: (interaction: Interaction) => void): void;
    addOnInteractionACWCallback(callback: (interaction: Interaction) => void): void;
    addOnInteractionHeldCallback(callback: (interaction: Interaction) => void): void;
    addOnInteractionUnheldCallback(callback: (interaction: Interaction) => void): void;
    addOnInteractionUnknownCallback(callback: (interaction: Interaction) => void): void;
    // addOnInteractionMediaAddedCallback(callback: (media: InteractionMediaAddedMessageBody) => void): void;
    // addOnInteractionContextAddedCallback(callback: (context: InteractionMediaContextAddedMessageBody) => void): void;
    addOnInteractionContextRemovedCallback(callback: (message: any) => void): void;
    addOnInteractionAudioUpdatedCallback(callback: (message: any) => void): void;
    // getInteractionMedia(): IInteractionMedia;
    disableLocalVideo(): void;
    enableLocalVideo(): void;
}

export interface InteractionAcceptedMessageBody {
    id: string;
}

export interface InteractionDeletedMessageBody {
    id: string;
}