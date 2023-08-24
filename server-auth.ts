import react, {ReactElement} from 'react';
import {ExternalProvider, JsonRpcProvider, Web3Provider} from '@ethersproject/providers';
import {AbstractProvider} from 'web3-core';
import EventEmitter from 'eventemitter3';
import {TypedMessage, MessageTypes} from '@metamask/eth-sig-util';
import {FetchOptions} from 'ofetch';
declare const SUPPORTED_JSON_RPC_METHODS: readonly[
    "eth_sign",
    "eth_populateTransactionRequest",
    "eth_signTransaction",
    "personal_sign",
    "eth_signTypedData_v4"
];
typeJsonRpcMethodType = typeof SUPPORTED_JSON_RPC_METHODS[number];
typeQuantity = string | number | bigint;
typeUnsignedTransactionRequest = {
    from?: string;
    to?: string;
    nonce?: Quantity;
    gasLimit?: Quantity;
    gasPrice?: Quantity;
    data?: ArrayLike < number > | string;
    value?: Quantity;
    chainId?: number;
    type?: number;
    accessList?: Array < {
        address: string;
        storageKeys: Array < string >
    } > | Array < [
        string,
        Array < string >
    ] > | Record < string,
    Array < string >>;
    maxPriorityFeePerGas?: Quantity;
    maxFeePerGas?: Quantity
};
typeTransactionLog = {
    blockNumber: number;
    blockHash: string;
    transactionIndex: number;
    removed: boolean;
    address: string;
    data: string;
    topics: Array < string >;
    transactionHash: string;
    logIndex: number
};
typeTransactionReceipt = {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    root?: string;
    logs: Array < TransactionLog >;
    logsBloom: string;
    blockHash: string;
    transactionHash: string;
    blockNumber: number;
    confirmations: number;
    byzantium: boolean;
    type: number;
    status?: number;
    gasUsed: string;
    cumulativeGasUsed: string;
    effectiveGasPrice: string
};
interface BaseRpcRequestType {
    method: JsonRpcMethodType
}
interface eth_populateTransactionRequest extends BaseRpcRequestType {
    method: 'eth_populateTransactionRequest';
    params: [UnsignedTransactionRequest]
}
interface eth_populateTransactionRequestResponse {
    method: 'eth_populateTransactionRequest';
    data: UnsignedTransactionRequest
}
interface eth_signTransaction extends BaseRpcRequestType {
    method: 'eth_signTransaction';
    params: [UnsignedTransactionRequest]
}
interface eth_sign extends BaseRpcRequestType {
    method: 'eth_sign';
    params: [
    address: string,
    message: string]
}
interface eth_signResponse {
    method: 'eth_sign';
    data: string
}
interface personal_sign extends BaseRpcRequestType {
    method: 'personal_sign';
    params: [string, string]
}
interface personal_signResponse {
    method: 'personal_sign';
    data: string
}
interface eth_signTransactionResponse {
    method: 'eth_signTransaction';
    data: string
}
interface eth_signTypedData_v4 extends BaseRpcRequestType {
    method: 'eth_signTypedData_v4';
    params: [
        string,
        TypedMessage < MessageTypes > | string
    ]
}
interface eth_signTypedData_v4Response {
    method: 'eth_signTypedData_v4';
    data: string
}
typeRpcRequestType = eth_signTransaction | eth_populateTransactionRequest | eth_sign | personal_sign | eth_signTypedData_v4;
typeRpcResponseType = eth_signTransactionResponse | eth_populateTransactionRequestResponse | eth_signResponse | personal_signResponse | eth_signTypedData_v4Response;
typeWalletCreateRequestDataType = {
    accessToken: string;
    recoveryPin?: string
};
typeWalletConnectRequestDataType = {
    accessToken: string;
    address: string
};
typeWalletRecoverRequestDataType = {
    accessToken: string;
    address: string;
    recoveryPin?: string
};
typeWalletRpcRequestDataType = {
    accessToken: string;
    address: string;
    request: RpcRequestType
};
typeWalletCreateResponseDataType = {
    address: string
};
typeWalletConnectResponseDataType = {
    address: string
};
typeWalletRecoverResponseDataType = {
    address: string
};
typeWalletRpcResponseDataType = {
    address: string;
    response: RpcResponseType
};
interface EmbeddedWalletProxy {
    create: (data : WalletCreateRequestDataType) => Promise<WalletCreateResponseDataType>;
    connect: (data : WalletConnectRequestDataType) => Promise<WalletConnectResponseDataType>;
    recover: (data : WalletRecoverRequestDataType) => Promise<WalletRecoverResponseDataType>;
    rpc: (data : WalletRpcRequestDataType) => Promise<WalletRpcResponseDataType>
}
typeRpcUrls = {
    http: readonly string[];
    webSocket?: readonly string[]
};
typeNativeCurrency = {
    name: string;
    symbol: string;
    decimals: number
};
typeBlockExplorer = {
    name: string;
    url: string
};
typeChain = {
    id: number;
    name: string;
    network: string;
    nativeCurrency: NativeCurrency;
    blockExplorers?: {
    [key: string]: BlockExplorer;
        default: BlockExplorer
    };
    rpcUrls: {
    [key: string]: RpcUrls;
        default: RpcUrls;
        public: RpcUrls
    };
    testnet?: boolean
};
typeRpcConfig = {
    rpcUrls: {
    [key: number]: string
    }
};
declare const SUPPORTED_CHAINS: readonly[
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain,
    Chain
];
declare abstract class PrivyErrorextends Error {
    abstract type : string;
    cause?: Error;
    privyErrorCode?: PrivyErrorCode;
    protected constructor(message : string, cause? : unknown, privyErrorCode? : PrivyErrorCode);
    toString(): string
}
declare enum PrivyErrorCode {
    MISSING_OR_INVALID_PRIVY_APP_ID = "missing_or_invalid_privy_app_id",
    MISSING_OR_INVALID_PRIVY_ACCOUNT_ID = "missing_or_invalid_privy_account_id",
    INVALID_DATA = "invalid_data",
    LINKED_TO_ANOTHER_USER = "linked_to_another_user",
    ALLOWLIST_REJECTED = "allowlist_rejected",
    OAUTH_USER_DENIED = "oauth_user_denied",
    UNKNOWN_AUTH_ERROR = "unknown_auth_error",
    USER_EXITED_AUTH_FLOW = "exited_auth_flow",
    MUST_BE_AUTHENTICATED = "must_be_authenticated",
    UNKNOWN_CONNECT_WALLET_ERROR = "unknown_connect_wallet_error",
    GENERIC_CONNECT_WALLET_ERROR = "generic_connect_wallet_error",
    CLIENT_REQUEST_TIMEOUT = "client_request_timeout",
    INVALID_CREDENTIALS = "invalid_credentials"
}
declare class ProviderRpcErrorextends PrivyError {
    type : string;
    readonly code : number;
    readonly data?: unknown;
    constructor(message : string, code : number, data? : unknown)
}
declare global {
    interface Window {
        ethereum?: any
    }
}
typeProviderConnectInfo = {
    chainId: string
};
typeOnConnectEventHandler = (connectInfo : ProviderConnectInfo) => void;
typeOnDisconnectEventHandler = (error : ProviderRpcError) => void;
typeOnChainChangedEventHandler = (chainId : string | number) => void;
typeOnAccountsChangedEventHandler = (accounts : string[]) => void;
typeProviderMessage = {
    type: string;
    data: unknown
};
typeOnMessageEventHandler = (message : ProviderMessage) => void;
typeEIP1193OnEventHandler = OnConnectEventHandler | OnDisconnectEventHandler | OnChainChangedEventHandler | OnAccountsChangedEventHandler | OnMessageEventHandler;
interface EIP1193Provider {
    request: (request : {
        method: string;
        params?: Array < any > | undefined
    }) => Promise<any>;
    on: (eventName : string, listener : EIP1193OnEventHandler) => any;
    removeListener: (eventName : string | symbol, listener : (...args : any[]) => void) => any
}
declare class PrivyProxyProviderimplements EIP1193Provider {
    walletProvider?: EIP1193Provider;
    private _subscriptions;
    constructor(walletProvider? : EIP1193Provider);
    on(eventName : string, listener : (...args : any[]) => void): any;
    request(request : {
        method: string;
        params?: any[] | undefined
    }): Promise < any >;
    removeListener : (eventName : string | symbol, listener : (...args : any[]) => void) => any;
    setWalletProvider : (provider : EIP1193Provider) => void
}
interface RequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object
}
declare class Embedded1193Providerextends EventEmitter implements EIP1193Provider {
    walletProxy : EmbeddedWalletProxy;
    address : string;
    provider : JsonRpcProvider;
    chainId : number;
    rpcConfig : RpcConfig;
    constructor(walletProxy : EmbeddedWalletProxy, address : string, rpcConfig : RpcConfig, chainId? : number);
    handleSendTransaction(args : RequestArguments): Promise < string >;
    private handleSwitchEthereumChain;
    private handlePersonalSign;
    private handleEstimateGas;
    request(args : RequestArguments): Promise < unknown >;
    connect(): Promise < string | null >
}
declare class AsExternalProviderextends PrivyProxyProviderimplements ExternalProvider {
    constructor(provider : EIP1193Provider);
    isMetaMask?: boolean;
    isStatus?: boolean;
    host?: string;
    path?: string;
    sendAsync?: (request : {
        method: string;
        params?: Array < any >
    }, callback : (error : any, response : any) => void) => void;
    send?: (request : {
        method: string;
        params?: Array < any >
    }, callback : (error : any, response : any) => void) => void
}
interface ConnectorEvents {
    walletsUpdated(): void;
    initialized(): void
}
declare abstract class WalletConnectorextends EventEmitter < ConnectorEvents > {
    connected : boolean;
    initialized : boolean;
    wallets : BaseConnectedWallet[];
    walletClientType : WalletClientType;
    abstract connectorType : ConnectorType;
    abstract proxyProvider : PrivyProxyProvider | Embedded1193Provider;
    constructor(walletClientType : WalletClientType);
    buildConnectedWallet(address : string, chainId : string): BaseConnectedWallet;
    syncAccounts(prefetchedAccounts? : string[]): Promise < void >;
    getConnectedWallet(): Promise < BaseConnectedWallet | null >;
    isConnected(): Promise < boolean >;
    sign(message : string): Promise < string >;
    protected onAccountsChanged : (accounts : string[]) => void;
    protected onChainChanged : (chainId : string) => void;
    protected onDisconnect : () => void;
    protected onConnect : () => void;
    subscribeListeners(): void;
    unsubscribeListeners(): void;
    abstract get walletBranding(): WalletBranding;
    abstract connect(options : {
        showPrompt?: boolean;
        chainId?: number
    }): Promise < BaseConnectedWallet | null >;
    abstract disconnect(): void;
    abstract promptConnection(walletClientType : WalletClientType): void
}
declare const SUPPORTED_OAUTH_PROVIDERS: readonly[
    "google",
    "discord",
    "twitter",
    "github",
    "apple"
];
typeOAuthProviderType = typeof SUPPORTED_OAUTH_PROVIDERS[number];
typeEmbeddedWalletClientType = 'privy';
typeInjectedWalletClientType = 'metamask' | 'phantom';
typeCoinbaseWalletClientType = 'coinbase_wallet';
typeWalletConnectWalletClientType = 'metamask' | 'trust' | 'safe' | 'rainbow' | 'uniswap' | 'zerion' | 'argent' | 'spot' | 'omni' | 'cryptocom' | 'blockchain' | 'safepal' | 'bitkeep' | 'zengo' | '1inch' | 'binance' | 'exodus' | 'mew_wallet' | 'alphawallet' | 'keyring_pro' | 'mathwallet' | 'unstoppable' | 'obvious' | 'ambire' | 'internet_money_wallet' | 'coin98' | 'abc_wallet' | 'arculus_wallet' | 'haha' | 'cling_wallet' | 'broearn' | 'copiosa' | 'burrito_wallet' | 'enjin_wallet' | 'plasma_wallet' | 'avacus' | 'bee' | 'pitaka' | 'pltwallet' | 'minerva' | 'kryptogo' | 'prema' | 'slingshot' | 'kriptonio' | 'timeless' | 'secux' | 'bitizen' | 'blocto' | 'safemoon';
typeUnknownWalletClientType = 'unknown';
typeWalletClientType = InjectedWalletClientType | CoinbaseWalletClientType | WalletConnectWalletClientType | EmbeddedWalletClientType | UnknownWalletClientType;
declare const SUPPORTED_CONNECTOR_TYPES: string[];
typeConnectorType = typeof SUPPORTED_CONNECTOR_TYPES[number];
typeWalletBranding = {
    name: string;
    icon?: string | EmbeddedSVG
};
typeLinkedAccountType = 'wallet' | 'email' | 'phone' | 'google_oauth' | 'twitter_oauth' | 'discord_oauth' | 'github_oauth' | 'apple_oauth';
interface LinkMetadata {
    type: LinkedAccountType;
    verifiedAt: Date
}
interface Wallet {
    address: string;
    chainType: 'ethereum' | 'solana';
    chainId?: string;
    walletClient: 'privy' | 'unknown';
    walletClientType?: string;
    connectorType?: string;
    recoveryMethod?: 'privy' | 'user-passcode'
}
interface BaseConnectedWallet {
    address: string;
    chainId: string;
    connectedAt: number;
    walletClientType: WalletClientType;
    connectorType: ConnectorType;
    isConnected: () => Promise<boolean>;
    switchChain: (targetChainId : `0x${string}` | number) => Promise<void>;
    getEthereumProvider: () => Promise<EIP1193Provider>;
    getEthersProvider: () => Promise<Web3Provider>;
    getWeb3jsProvider: () => Promise<AbstractProvider>;
    sign: (message : string) => Promise<string>;
    disconnect: () => void
}
interface ConnectedWallet extends BaseConnectedWallet {
    linked: boolean;
    loginOrLink: () => Promise<void>;
    unlink: () => Promise<void>
}
interface Email {
    address: string
}
interface Phone {
    number: string
}
interface Google {
    subject: string;
    email: string;
    name: string | null
}
interface Twitter {
    subject: string;
    username: string | null;
    name: string | null
}
interface Discord {
    subject: string;
    username: string | null;
    email: string | null
}
interface Github {
    subject: string;
    username: string | null;
    name: string | null;
    email: string | null
}
interface Apple {
    subject: string;
    email: string
}
interface EmailWithMetadata extends LinkMetadata,
Email {
    type : 'email'
}
interface PhoneWithMetadata extends LinkMetadata,
Phone {
    type : 'phone'
}
interface WalletWithMetadata extends LinkMetadata,
Wallet {
    type : 'wallet'
}
interface GoogleOAuthWithMetadata extends LinkMetadata,
Google {
    type : 'google_oauth'
}
interface TwitterOAuthWithMetadata extends LinkMetadata,
Twitter {
    type : 'twitter_oauth'
}
interface DiscordOAuthWithMetadata extends LinkMetadata,
Discord {
    type : 'discord_oauth'
}
interface GithubOAuthWithMetadata extends LinkMetadata,
Github {
    type : 'github_oauth'
}
interface AppleOAuthWithMetadata extends LinkMetadata,
Apple {
    type : 'apple_oauth'
}
typeLinkedAccountWithMetadata = WalletWithMetadata | EmailWithMetadata | PhoneWithMetadata | GoogleOAuthWithMetadata | TwitterOAuthWithMetadata | DiscordOAuthWithMetadata | GithubOAuthWithMetadata | AppleOAuthWithMetadata;
interface User {
    id: string;
    createdAt: Date;
    email?: Email;
    phone?: Phone;
    wallet?: Wallet;
    google?: Google;
    twitter?: Twitter;
    discord?: Discord;
    github?: Github;
    apple?: Apple;
    linkedAccounts: Array < LinkedAccountWithMetadata >
}
typePrivyServerConfig = {
    id?: string;
    name?: string;
    verificationKey?: string;
    showWalletLoginFirst?: boolean;
    allowlistConfig: AllowlistConfig;
    walletAuth?: boolean;
    emailAuth?: boolean;
    smsAuth?: boolean;
    googleOAuth?: boolean;
    twitterOAuth?: boolean;
    discordOAuth?: boolean;
    githubOAuth?: boolean;
    appleOAuth?: boolean;
    termsAndConditionsUrl: string | null;
    privacyPolicyUrl: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    customApiUrl?: string | null;
    walletConnectCloudProjectId?: string | null;
    embeddedWalletConfig: EmbeddedWalletsConfig;
    captchaEnabled?: boolean;
    logoUrl?: string;
    accentColor?: string
};
typeHexColor = `#${string}`;
typePrivyClientConfig = {
    appearance?: {
        theme?: 'light' | 'dark' | HexColor;
        accentColor?: HexColor;
        logo?: string | ReactElement;
        showWalletLoginFirst?: boolean
    };
    loginMethods?: Array < 'wallet' | 'email' | 'sms' | 'google' | 'twitter' | 'discord' | 'github' | 'apple' >;
    legal?: {
        termsAndConditionsUrl?: string | null;
        privacyPolicyUrl?: string | null
    };
    walletConnectCloudProjectId?: string;
    rpcConfig?: RpcConfig;
    captchaEnabled?: boolean;
    embeddedWallets?: {
        createOnLogin?: EmbeddedWalletCreateOnLoginConfig;
        requireUserPasswordOnCreate?: boolean;
        noPromptOnSignature?: boolean
    };
    _render?: {
        inDialog?: boolean;
        inParentNodeId?: string | null
    }
};
interface AllowlistConfig {
    errorTitle: string | null;
    errorDetail: string | null;
    errorCtaText: string | null;
    errorCtaLink: string | null
}
typeEmbeddedWalletCreateOnLoginConfig = 'users-without-wallets' | 'all-users' | 'off';
interface EmbeddedWalletsConfig {
    createOnLogin: EmbeddedWalletCreateOnLoginConfig;
    requireUserPasswordOnCreate: boolean
}
typeSignMessageModalUIOptions = {
    title?: string;
    description?: string;
    buttonText?: string
};
typeTransactionUIOptions = {
    title?: string;
    action?: string;
    contractInfo?: ContractUIOptions;
    description?: string;
    actionDescription?: string
};
typeContractUIOptions = {
    url?: string;
    name?: string;
    imgUrl?: string;
    imgAltText?: string;
    imgSize?: 'sm' | 'lg';
    actionText?: string
};
typeSendTransactionModalUIOptions = {
    header?: string;
    description?: string;
    buttonText?: string;
    transactionInfo?: TransactionUIOptions;
    title?: string;
    modalTitle?: string;
    senderInfo?: ContractUIOptions
};
declare function getAccessToken(): Promise < string | null >;
interface PrivyProviderProps {
    appId: string;
    onSuccess?: (user : User, isNewUser : boolean) => void;
    createPrivyWalletOnLogin?: boolean;
    config?: PrivyClientConfig;
    apiUrl?: string;
    children: react.ReactNode
}
declare const PrivyProvider: ({
    config,
    ...props
} : PrivyProviderProps) => JSX.Element;
interface ConnectorManagerEvents {
    walletsUpdated(): void
}
declare class ConnectorManagerextends EventEmitter < ConnectorManagerEvents > {
    walletConnectors : WalletConnector[];
    initialized : boolean;
    private storedConnections;
    private activeWallet ?;
    private walletConnectCloudProjectId;
    private rpcConfig;
    constructor(walletConnectCloudProjectId
    : string, rpcConfig
    : RpcConfig);
    get wallets()
    : BaseConnectedWallet[];
    initialize()
    : void;
    findWalletConnector(connectorType
    : ConnectorType, walletClientType
    : WalletClientType)
    : WalletConnector | null;
    private onInitialized;
    private onWalletsUpdated;
    addEmbeddedWalletConnector(walletProxy
    : EmbeddedWalletProxy, address
    : string)
    : void;
    removeEmbeddedWalletConnector()
    : void;
    createWalletConnector(connectorType
    : ConnectorType, walletClientType
    : WalletClientType)
    : Promise < WalletConnector | null >;
    private addWalletConnector;
    private loadConnectionHistory;
    private saveConnectionHistory;
    getEthereumProvider
    : () => EIP1193Provider;
    activeWalletSign(message
    : string)
    : Promise < string | null >;
    setActiveWallet(address
    : string)
    : void
}
interface PrivyInterface {
    ready: boolean;
    authenticated: boolean;
    user: User | null;
    connectWallet: () => void;
    login: () => void;
    linkEmail: () => void;
    linkPhone: () => void;
    linkWallet: () => void;
    linkGoogle: () => void;
    linkTwitter: () => void;
    linkDiscord: () => void;
    linkGithub: () => void;
    linkApple: () => void;
    logout: () => Promise<void>;
    getAccessToken: () => Promise<string | null>;
    getEthereumProvider: () => EIP1193Provider;
    getEthersProvider: () => Web3Provider;
    getWeb3jsProvider: () => AbstractProvider;
    walletConnectors: ConnectorManager | null;
    unlinkEmail: (address
    : string) => Promise<User>;
    unlinkPhone: (phoneNumber
    : string) => Promise<User>;
    unlinkWallet: (address
    : string) => Promise<User>;
    unlinkGoogle: (subject
    : string) => Promise<User>;
    unlinkTwitter: (subject
    : string) => Promise<User>;
    unlinkDiscord: (subject
    : string) => Promise<User>;
    unlinkGithub: (subject
    : string) => Promise<User>;
    unlinkApple: (subject
    : string) => Promise<User>;
    setActiveWallet: (address
    : string) => Promise<void>;
    forkSession: () => Promise<string>;
    createWallet: () => Promise<Wallet>;
    signMessage: (message
    : string, uiOptions?
    : SignMessageModalUIOptions) => Promise<string>;
    sendTransaction: (data
    : UnsignedTransactionRequest, uiOptions?
    : SendTransactionModalUIOptions) => Promise<TransactionReceipt>;
    exportWallet: () => Promise<void>
}
declare const usePrivy: () => PrivyInterface;
interface UseWalletsInterface {
    wallets: ConnectedWallet[]
}
declare function useWallets(): UseWalletsInterface;
declare const VERSION: string;
interface ResponseEmailAccount {
    type: 'email';
    address: string;
    verified_at: number
}
interface ResponsePhoneAccount {
    type: 'phone';
    phoneNumber: string;
    verified_at: number
}
interface ResponseEthereumAccount {
    type: 'wallet';
    address: string;
    chain_type: 'ethereum';
    chain_id?: string;
    wallet_client: 'privy' | 'unknown';
    wallet_client_type?: string;
    connector_type?: string;
    recovery_method?: 'privy' | 'user-passcode';
    verified_at: number
}
interface ResponseOAuthGoogle {
    type: 'google_oauth';
    subject: string;
    email: string;
    name: string | null;
    verified_at: number
}
interface ResponseOAuthTwitter {
    type: 'twitter_oauth';
    subject: string;
    username: string | null;
    name: string | null;
    verified_at: number
}
interface ResponseOAuthDiscord {
    type: 'discord_oauth';
    subject: string;
    username: string | null;
    email: string | null;
    verified_at: number
}
interface ResponseOAuthGithub {
    type: 'github_oauth';
    subject: string;
    username: string | null;
    name: string | null;
    email: string | null;
    verified_at: number
}
interface ResponseOAuthApple {
    type: 'apple_oauth';
    subject: string;
    email: string;
    verified_at: number
}
typeLinkedAccountsResponseType = Array < ResponseEmailAccount | ResponsePhoneAccount | ResponseEthereumAccount | ResponseOAuthGoogle | ResponseOAuthTwitter | ResponseOAuthDiscord | ResponseOAuthGithub | ResponseOAuthApple >;
interface GetCurrentUserResponse {
    id: string;
    created_at: number;
    linked_accounts: LinkedAccountsResponseType
}
interface DefaultsType {
    baseURL: string;
    timeout: number
}
declare class Http {
    fallbackApiUrl
    : string;
    private appId;
    private client;
    private defaults;
    private sdkVersion;
    private baseFetch;
    constructor(appId
    : string, client
    : PrivyClient, defaults
    : DefaultsType);
    get < T = any > (path
    : string, config?
    : FetchOptions < 'json' >): Promise < T >;
    post < T = any,
    D = any > (path
    : string, data?
    : D, config?
    : FetchOptions < 'json' >): Promise < T >;
    delete < T = any > (path
    : string, config?
    : FetchOptions < 'json' >): Promise < T >
}
interface ValidSessionResponse {
    user: GetCurrentUserResponse;
    token: string;
    refresh_token: string | null;
    is_new_user?: boolean
}
typeAuthMeta = {
[key: string]: any
};
interface AuthFlow {
    api?: Http;
    meta: AuthMeta;
    authenticate(): Promise < ValidSessionResponse >;
    link(): Promise < GetCurrentUserResponse >
}
declare class PrivyClient {
    privateapi;
    private appId;
    private session;
    private timeout;
    private clientAnalyticsId;
    useServerCookies
    : boolean;
    apiUrl
    : string;
    fallbackApiUrl
    : string;
    authFlow?: AuthFlow;
    connectors?: ConnectorManager;
    constructor(options
    : {
        apiUrl?: string;
        appId: string;
        timeout?: number
    });
    initializeConnectorManager(walletConnectCloudProjectId
    : string, rpcConfig
    : RpcConfig): void;
    generateApi(): Http;
    updateApiUrl(customApiUrl?
    : string | null): void;
    authenticate(): Promise < {
        user: User | null;
        isNewUser?: boolean | undefined
    } >;
    link(): Promise < User | null >;
    logout(): Promise < void >;
    startAuthFlow(authFlow
    : AuthFlow): void;
    unlinkEmail(address
    : string): Promise < User >;
    unlinkPhone(phoneNumber
    : string): Promise < User >;
    unlinkWallet(address
    : string): Promise < User >;
    unlinkOAuth(provider
    : OAuthProviderType, subject
    : string): Promise < User >;
    createAnalyticsEvent(eventName
    : string, payload?
    : {
    [key: string]: any
    }, timestamp?
    : Date): Promise < void >;
    getAuthenticatedUser(): Promise < User | null >;
    getAccessToken(options?
    : {
        disableAutoRefresh?: boolean
    }): Promise < string | null >;
    getServerConfig(): Promise < PrivyServerConfig >;
    getUsdTokenPrice(chainId
    : string | number): Promise < number | undefined >;
    forkSession(): Promise < string >
}
typeCallbackError = (error
: PrivyErrorCode) => void;
typePrivyEvents = {
    login: {
        onComplete?: (user
        : User, isNewUser
        : boolean, wasAlreadyAuthenticated
        : boolean) => void;
        onError?: CallbackError
    };
    logout: {
        onSuccess?: () => void
    };
    connectWallet: {
        onSuccess?: (wallet
        : BaseConnectedWallet) => void;
        onError?: CallbackError
    }
};
declare function useLogin(callbacks?
: PrivyEvents['login']): {
    login: () => void
};
declare function useLogout(callbacks?
: PrivyEvents['logout']): {
    logout: () => Promise<void>
};
declare function useConnectWallet(callbacks?
: PrivyEvents['connectWallet']): {
    connectWallet: () => void
};
export {
    Apple,
    AppleOAuthWithMetadata,
    AsExternalProvider,
    CallbackError,
    ConnectedWallet,
    ConnectorManager,
    ContractUIOptions,
    Discord,
    DiscordOAuthWithMetadata,
    EIP1193Provider,
    Email,
    EmailWithMetadata,
    Github,
    GithubOAuthWithMetadata,
    Google,
    GoogleOAuthWithMetadata,
    Phone,
    PhoneWithMetadata,
    PrivyClient,
    PrivyClientConfig,
    PrivyEvents,
    PrivyInterface,
    PrivyProvider,
    PrivyProviderProps,
    PrivyProxyProvider,
    Quantity,
    SUPPORTED_CHAINS,
    SendTransactionModalUIOptions,
    SignMessageModalUIOptions,
    TransactionLog,
    TransactionReceipt,
    TransactionUIOptions,
    Twitter,
    TwitterOAuthWithMetadata,
    UnsignedTransactionRequest,
    UseWalletsInterface,
    User,
    VERSION,
    Wallet,
    WalletConnector,
    WalletWithMetadata,
    getAccessToken,
    useConnectWallet,
    useLogin,
    useLogout,
    usePrivy,
    useWallets
};
