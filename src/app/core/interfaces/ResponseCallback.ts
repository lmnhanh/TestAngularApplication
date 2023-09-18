export interface ResponseCallback<TSuccess, TError>{
    ifSuccessThen: (response: TSuccess) => void;
    ifErrorThen?: (error: TError) => void
}